import Moment from 'moment-timezone';

import shiftsForDay from 'models/shift/shiftsForDay';
import { FORMATS } from 'models/time/format';
import { Shift } from 'spec/factories';

describe('shiftsForDay()', () => {
  it('gets the correct shifts', () => {
    const day = Moment.utc([2018, 11, 25]);
    const shiftOnOtherDay = new Shift({
      endTime: day.clone().add(1, 'day').add(10, 'hours').format(FORMATS.SERVER),
      startTime: day.clone().add(1, 'day').add(5, 'hours').format(FORMATS.SERVER),
    });
    const shiftOnDay = new Shift({
      endTime: day.clone().add(10, 'hours').format(FORMATS.SERVER),
      startTime: day.clone().add(5, 'hours').format(FORMATS.SERVER),
    });

    expect(shiftsForDay([shiftOnDay, shiftOnOtherDay], day)).toEqual([shiftOnDay]);
  });
});
