import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const updateSpots = (prevDays, appointments) => {
    const days = prevDays
      .map(
        (day) =>
          day.appointments.filter((app) => !appointments[app].interview).length
      )
      .map((s, index) => {
        prevDays[index].spots = s;
        return prevDays[index];
      });

    setState((prev) => ({ ...prev, days }));
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

    updateSpots(state.days, appointments);

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      if (res.status === 204) {
        setState((prev) => ({ ...prev, appointments }));
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

    updateSpots(state.days, appointments);

    return axios.delete(`/api/appointments/${id}`, appointment).then((res) => {
      if (res.status === 204) {
        setState((prev) => ({ ...prev, appointments }));
      }
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
