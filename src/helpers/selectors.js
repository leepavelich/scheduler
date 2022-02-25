export const getAppointmentsForDay = (state, day) => {
  const { days, appointments } = state;

  const selectedDay = days.find((d) => d.name === day);

  if (!selectedDay) return [];

  return selectedDay.appointments.map((i) => appointments[i]);
};
