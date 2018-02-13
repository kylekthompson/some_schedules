import { signIn, signOut } from 'components/AuthenticationProvider/state/actions';
import { SIGN_IN, SIGN_OUT } from 'components/AuthenticationProvider/state/types';

describe('AuthenticationProvider actions', () => {
  describe('signIn()', () => {
    it('calls setToken with the passed in token', () => {
      const setToken = jest.fn();
      const token = 'token';

      signIn(token, setToken);

      expect(setToken).toHaveBeenCalledTimes(1);
      expect(setToken).toHaveBeenCalledWith(token);
    });

    it('returns the correct action', () => {
      const setToken = jest.fn();
      const token = 'token';

      expect(signIn(token, setToken)).toEqual({
        type: SIGN_IN,
      });
    });
  });

  describe('signOut()', () => {
    it('calls deleteToken', () => {
      const deleteToken = jest.fn();

      signOut(deleteToken);

      expect(deleteToken).toHaveBeenCalledTimes(1);
    });

    it('returns the correct action', () => {
      const deleteToken = jest.fn();

      expect(signOut(deleteToken)).toEqual({
        type: SIGN_OUT,
      });
    });
  });
});
