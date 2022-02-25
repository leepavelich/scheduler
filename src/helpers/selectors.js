export const getAppointmentsForDay = (state, day) => {
  const { days, appointments } = state;

  if (!days.length) return [];

  const selectedDay = days.filter((d) => d.name === day)[0];

  if (!selectedDay) return [];

  return selectedDay.appointments.map((i) => appointments[i]);
};
