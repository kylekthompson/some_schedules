import time from 'models/time';

export const sortedShiftsForCurrentDay = (currentDay, shifts) => shifts.filter((shift) =>
  currentDay.isSame(time.toMoment(shift.startTime), 'day')
).sort((a, b) => {
  const aStart = time.toMoment(a.startTime);
  const aEnd = time.toMoment(a.endTime);
  const bStart = time.toMoment(b.startTime);
  const bEnd = time.toMoment(b.endTime);

  if (aStart.isSame(bStart, 'minute')) {
    if (aEnd.isBefore(bEnd)) {
      return -1;
    } else {
      return 1;
    }
  } else if (aStart.isBefore(bStart, 'minute')) {
    return -1;
  } else {
    return 1;
  }
});
