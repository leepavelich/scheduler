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
        return {
          ...state,
          appointments: action.appointments,
          days: action.days,
        };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const updateSpots = (appointments) => {
    const days = [...state.days]; // shallow copy
    return days.map((shallowDay) => {
      const day = { ...shallowDay };
      day.spots = day.appointments.filter(
        (appointment) => !appointments[appointment].interview
      ).length;
      return day;
    });
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      if (res.status === 204) {
        dispatch({
          type: SET_INTERVIEW,
          appointments,
          days: updateSpots(appointments),
        });
      }
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`, appointment).then((res) => {
      if (res.status === 204) {
        dispatch({
          type: SET_INTERVIEW,
          appointments,
          days: updateSpots(appointments),
        });
      }
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
