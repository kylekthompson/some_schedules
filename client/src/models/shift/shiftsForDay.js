import { toDate, isSameDay } from 'models/time';

const shiftsForDay = (shifts, day) => shifts.filter((shift) => isSameDay(toDate(shift.startTime), day));

export default shiftsForDay;
