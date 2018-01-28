import Moment from 'moment-timezone';

import shiftsForUserId from 'models/shift/shiftsForUserId';
import { FORMATS } from 'models/time/format';
import { Shift } from 'spec/factories';

describe('shiftsForUserId()', () => {
  it('gets the correct shifts', () => {
    const expectedShift = new Shift();
    expect(shiftsForUserId([expectedShift, new Shift()], expectedShift.user.id)).toEqual([expectedShift]);
  });
});