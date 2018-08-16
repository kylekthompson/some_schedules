import shiftsForDay from 'models/shift/shifts-for-day';
import { addDays, addHours, format } from 'models/time';
import { Shift } from 'spec/factories';

describe('shiftsForDay()', () => {
  it('gets the correct shifts', () => {
    const day = new Date(Date.UTC(2018, 11, 25));
    const shiftOnOtherDay = new Shift({
      endTime: format.fromServer(addHours(addDays(day, 1), 10)),
      startTime: format.fromServer(addHours(addDays(day, 1), 5)),
    });
    const shiftOnDay = new Shift({
      endTime: format.fromServer(addHours(day, 10)),
      startTime: format.fromServer(addHours(day, 5)),
    });

    expect(shiftsForDay([shiftOnDay, shiftOnOtherDay], day)).toEqual([
      shiftOnDay,
    ]);
  });
});
