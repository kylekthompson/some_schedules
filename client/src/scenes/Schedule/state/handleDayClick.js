const handleDayClick = (day) => (state) => ({
  ...state,
  selectedDay: day,
});

export default handleDayClick;
