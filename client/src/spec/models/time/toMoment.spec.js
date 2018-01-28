import Moment from 'moment-timezone';

import toMoment from 'models/time/toMoment';

describe('toMoment()', () => {
  it('works', () => {
    const expected = Moment.utc([2018, 11, 25, 0, 0, 0, 0]).tz(Moment.tz.guess());

    expect(toMoment('2018-12-25 00-00-00 UTC').toISOString()).toEqual(expected.toISOString());
  });
});
