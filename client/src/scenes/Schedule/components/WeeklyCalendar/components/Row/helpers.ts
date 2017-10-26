import { Moment } from 'moment-timezone';

import { IShift } from '../../../../../../services/graphql/types';
import { toMoment } from '../../../../helpers';

export const sortedShiftsForCurrentDay = (currentDay: Moment, shifts: IShift[]) => shifts.filter((shift) =>
  currentDay.isSame(toMoment(shift.startTime), 'day')
  ).sort((a, b) => {
  const aStart = toMoment(a.startTime);
  const aEnd = toMoment(a.endTime);
  const bStart = toMoment(b.startTime);
  const bEnd = toMoment(b.endTime);

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
