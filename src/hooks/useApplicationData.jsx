import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {
          ...state,
          day: action.day,
        };

      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };

      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview ? { ...action.interview } : null,
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        };

        // update spots, accounting for shallow copy
        const days = [...state.days].map((shallowDay) => {
          const day = { ...shallowDay };
          day.spots = day.appointments.filter(
            (appointment) => !appointments[appointment].interview
          ).length;
          return day;
        });

        return {
          ...state,
          appointments,
          days,
        };
      }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // database data
  useEffect(() => {
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

    // websocket
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    ws.onmessage = (event) => {
      const { type, id, interview } = JSON.parse(event.data);

      if (type === "SET_INTERVIEW") {
        dispatch({ type, id, interview });
      }
    };
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`);
  };

  return { state, setDay, bookInterview, cancelInterview };
}
