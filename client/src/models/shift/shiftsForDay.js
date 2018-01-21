import time from 'models/time';

const shiftsForDay = (shifts, day) => shifts.filter((shift) => day.isSame(time.toMoment(shift.startTime), 'day'));

export default shiftsForDay;
