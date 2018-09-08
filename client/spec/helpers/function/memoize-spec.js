import memoize from 'helpers/function/memoize';

describe('memoize', () => {
  it('only executes the function once per unique argument', () => {
    const callCounts = {
      a: 0,
      b: 0,
    };

    const memoized = memoize((key) => {
      callCounts[key] += 1;
      return key;
    });

    expect(memoized('a')).toEqual('a');
    expect(memoized('a')).toEqual('a');
    expect(memoized('b')).toEqual('b');
    expect(memoized('b')).toEqual('b');
    expect(callCounts).toEqual({
      a: 1,
      b: 1,
    });
  });
});
