import { isBefore, isSameMinute, toDate } from 'models/time';

const sortShiftsByTimeIncreasing = (shifts) => [...shifts].sort((shift1, shift2) => {
  const start1 = toDate(shift1.startTime);
  const end1 = toDate(shift1.endTime);
  const start2 = toDate(shift2.startTime);
  const end2 = toDate(shift2.endTime);

  if (isSameMinute(start1, start2) && isBefore(end1, end2)) {
    return -1;
  } else if (isSameMinute(start1, start2) && !isBefore(end1, end2)) {
    return 1;
  } else if (isBefore(start1, start2)) {
    return -1;
  }

  return 1;
});

export default sortShiftsByTimeIncreasing;
