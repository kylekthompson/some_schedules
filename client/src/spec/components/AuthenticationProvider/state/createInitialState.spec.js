import createInitialState from 'components/AuthenticationProvider/state/createInitialState';

describe('AuthenticationProvider createInitialState', () => {
  describe('when isSignedIn returns true', () => {
    it('returns the correct state', () => {
      const isSignedIn = jest.fn().mockReturnValue(true);

      expect(createInitialState(isSignedIn)).toEqual({
        isSignedIn: true,
      });
      expect(isSignedIn).toHaveBeenCalledTimes(1);
    });
  });

  describe('when isSignedIn returns false', () => {
    it('returns the correct state', () => {
      const isSignedIn = jest.fn().mockReturnValue(false);

      expect(createInitialState(isSignedIn)).toEqual({
        isSignedIn: false,
      });
      expect(isSignedIn).toHaveBeenCalledTimes(1);
    });
  });
});
