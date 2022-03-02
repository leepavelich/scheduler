import { useEffect, useReducer } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "reducers/application";

export default function useApplicationData() {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // database data
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

    // // websocket
    // const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    // ws.onmessage = (event) => {
    //   const { type, id, interview } = JSON.parse(event.data);

    //   if (type === "SET_INTERVIEW") {
    //     dispatch({ type, id, interview });
    //   }
    // };
    // return () => ws.close();
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview) => {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview })); // testing, not needed for WebSockets
  };

  const cancelInterview = (id) => {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview: null })); // testing, not needed for WebSockets
  };

  return { state, setDay, bookInterview, cancelInterview };
}
