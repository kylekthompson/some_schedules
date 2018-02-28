import ofSize from 'models/array/ofSize';

describe('ofSize()', () => {
  it('returns an array of the correct size', () => {
    [0, 1, 2].forEach((size) => {
      expect(ofSize(size)).toHaveLength(size);
    });
  });
});
