import { useEffect, useReducer } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "reducers/application";

const TESTING_MODE = true; // true for testing, false for WebSockets

export default function useApplicationData() {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // database API
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all.map((x) => x.data);
      dispatch({
        type: SET_APPLICATION_DATA,
        days,
        appointments,
        interviewers,
      });
    });

    // WebSocket
    if (!TESTING_MODE) {
      const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
      ws.onmessage = (event) => {
        const { type, id, interview } = JSON.parse(event.data);

        if (type === "SET_INTERVIEW") {
          dispatch({ type, id, interview });
        }
      };
      return () => ws.close();
    }
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview) => {
    return TESTING_MODE
      ? axios
          .put(`/api/appointments/${id}`, { interview })
          .then(() => dispatch({ type: SET_INTERVIEW, id, interview }))
      : axios.put(`/api/appointments/${id}`, { interview });
  };

  const cancelInterview = (id) => {
    return TESTING_MODE
      ? axios
          .delete(`/api/appointments/${id}`)
          .then(() => dispatch({ type: SET_INTERVIEW, id, interview: null }))
      : axios.delete(`/api/appointments/${id}`);
  };

  return { state, setDay, bookInterview, cancelInterview };
}
