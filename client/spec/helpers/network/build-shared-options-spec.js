import buildSharedOptions from 'src/helpers/network/build-shared-options';

describe('buildSharedOptions', () => {
  it('returns the shared options', () => {
    expect(buildSharedOptions()).toMatchSnapshot();
  });
});
