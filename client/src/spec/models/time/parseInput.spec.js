import Moment from 'moment-timezone';

import parseInput from 'models/time/parseInput';

describe('parseInput()', () => {
  it('works', () => {
    const day = Moment([2018, 11, 25]);
    const expected = [
      Moment([2018, 11, 25, 8, 15]).toISOString(),
      Moment([2018, 11, 25, 13]).toISOString(),
    ];

    expect(parseInput(day, '8:15a - 1 pm').map((d) => d.toISOString())).toEqual(expected);
  });
});
