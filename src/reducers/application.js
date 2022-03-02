export default function reducer(state, action) {
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

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
