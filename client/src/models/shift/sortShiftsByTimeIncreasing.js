import { toMoment } from 'models/time';

const sortShiftsByTimeIncreasing = (shifts) => [...shifts].sort((shift1, shift2) => {
  const start1 = toMoment(shift1.startTime);
  const end1 = toMoment(shift1.endTime);
  const start2 = toMoment(shift2.startTime);
  const end2 = toMoment(shift2.endTime);

  if (start1.isSame(start2, 'minute') && end1.isBefore(end2)) {
    return -1;
  } else if (start1.isSame(start2, 'minute') && !end1.isBefore(end2)) {
    return 1;
  } else if (start1.isBefore(start2, 'minute')) {
    return -1;
  }

  return 1;
});

export default sortShiftsByTimeIncreasing;
