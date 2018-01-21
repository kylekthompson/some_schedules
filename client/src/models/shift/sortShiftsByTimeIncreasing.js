import time from 'models/time';

const sortShiftsByTimeIncreasing = (shifts) => [...shifts].sort((shift1, shift2) => {
  const start1 = time.toMoment(shift1.startTime);
  const end1 = time.toMoment(shift1.endTime);
  const start2 = time.toMoment(shift2.startTime);
  const end2 = time.toMoment(shift2.endTime);

  if (start1.isSame(start2, 'minute')) {
    if (end1.isBefore(end2)) {
      return -1;
    } else {
      return 1;
    }
  } else if (start1.isBefore(start2, 'minute')) {
    return -1;
  } else {
    return 1;
  }
});

export default sortShiftsByTimeIncreasing;
