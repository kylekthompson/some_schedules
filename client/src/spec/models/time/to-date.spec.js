import { subtractMinutes } from 'models/time';
import toDate from 'models/time/to-date';

describe('toDate()', () => {
  it('works', () => {
    const fromServer = new Date(
      Date.UTC(2018, 11, 25, 0, 0, 0, 0),
    ).toISOString();
    const expected = new Date(Date.UTC(2018, 11, 25, 0, 0, 0, 0));

    expect(toDate(fromServer)).toEqual(expected);
  });
});
