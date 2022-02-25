export const getAppointmentsForDay = (state, day) => {
  const { days, appointments } = state;

  const selectedDay = days.find((d) => d.name === day);

  if (!selectedDay) return [];

  return selectedDay.appointments.map((i) => appointments[i]);
};

export const getInterviewersForDay = (state, day) => {
  const { days, interviewers } = state;

  const selectedDay = days.find((d) => d.name === day);

  if (!selectedDay) return [];

  return selectedDay.interviewers.map((i) => interviewers[i]);
};

export const getInterview = (state, interview) => {
  const { appointments, interviewers } = state;

  for (let index in appointments) {
    const appointment = appointments[index].interview;

    if (
      appointment &&
      interview &&
      appointment.student === interview.student &&
      appointment.interviewer === interview.interviewer
    ) {
      return {
        ...interview,
        interviewer: interviewers[interview.interviewer],
      };
    }
  }

  return null;
};
