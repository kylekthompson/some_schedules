import { toMoment } from 'models/time';

const shiftsForDay = (shifts, day) => shifts.filter((shift) => day.isSame(toMoment(shift.startTime), 'day'));

export default shiftsForDay;
