import Moment from 'moment-timezone';

import sortShiftsByTimeIncreasing from 'models/shift/sortShiftsByTimeIncreasing';
import { FORMATS } from 'models/time/format';
import { Shift } from 'spec/factories';

describe('sortShiftsByTimeIncreasing()', () => {
  it('gets the correct shifts', () => {
    const base = Moment([2018, 11, 25]);

    const shift1 = new Shift({
      endTime: base.clone().add(10, 'hours').format(FORMATS.SERVER),
      startTime: base.clone().add(4, 'hours').format(FORMATS.SERVER),
    });
    const shift2 = new Shift({
      endTime: base.clone().add(10, 'hours').format(FORMATS.SERVER),
      startTime: base.clone().add(5, 'hours').format(FORMATS.SERVER),
    });
    const shift3 = new Shift({
      endTime: base.clone().add(1, 'day').add(10, 'hours').format(FORMATS.SERVER),
      startTime: base.clone().add(1, 'day').add(5, 'hours').format(FORMATS.SERVER),
    });

    expect(sortShiftsByTimeIncreasing([shift2, shift3, shift1])).toEqual([shift1, shift2, shift3]);
  });
});
