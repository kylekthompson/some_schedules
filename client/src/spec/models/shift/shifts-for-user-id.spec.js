import shiftsForUserId from 'models/shift/shifts-for-user-id';
import { Shift } from 'spec/factories';

describe('shiftsForUserId()', () => {
  it('gets the correct shifts', () => {
    const expectedShift = new Shift();
    expect(shiftsForUserId([expectedShift, new Shift()], expectedShift.user.id)).toEqual([expectedShift]);
  });
});
