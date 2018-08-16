import sortShiftsByTimeIncreasing from 'models/shift/sort-shifts-by-time-increasing';
import { addDays, addHours, format } from 'models/time';
import { Shift } from 'spec/factories';

describe('sortShiftsByTimeIncreasing()', () => {
  it('gets the correct shifts', () => {
    const base = new Date(Date.UTC(2018, 11, 25));

    const shift1 = new Shift({
      endTime: format.fromServer(addHours(base, 10)),
      startTime: format.fromServer(addHours(base, 4)),
    });
    const shift2 = new Shift({
      endTime: format.fromServer(addHours(base, 10)),
      startTime: format.fromServer(addHours(base, 5)),
    });
    const shift3 = new Shift({
      endTime: format.fromServer(addHours(addDays(base, 1), 10)),
      startTime: format.fromServer(addHours(addDays(base, 1), 5)),
    });

    expect(sortShiftsByTimeIncreasing([shift2, shift3, shift1])).toEqual([
      shift1,
      shift2,
      shift3,
    ]);
  });
});
