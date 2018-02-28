import { subtractMinutes } from 'models/time';
import toDate from 'models/time/toDate';

describe('toDate()', () => {
  it('works', () => {
    const fromServer = new Date(Date.UTC(2018, 11, 25, 0, 0, 0, 0)).toISOString();
    let expected = new Date(Date.UTC(2018, 11, 25, 0, 0, 0, 0));
    expected = subtractMinutes(expected, expected.getTimezoneOffset());

    expect(toDate(fromServer)).toEqual(expected);
  });
});
