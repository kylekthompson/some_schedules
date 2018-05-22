import { toDate, isSameDay } from 'models/time';

export default function shiftsForDay(shifts, day) {
  return shifts.filter((shift) => isSameDay(toDate(shift.startTime), day));
}
