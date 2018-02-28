import parseInput from 'models/time/parseInput';

describe('parseInput()', () => {
  it('works', () => {
    const day = new Date(2018, 11, 25);
    const expected = [
      new Date(2018, 11, 25, 8, 15).toISOString(),
      new Date(2018, 11, 25, 13).toISOString(),
    ];

    expect(parseInput(day, '8:15a - 1 pm').map((d) => d.toISOString())).toEqual(expected);
  });
});
