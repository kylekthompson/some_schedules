import { signIn, signOut } from 'components/AuthenticationProvider/state/actions';
import reduce from 'components/AuthenticationProvider/state/reduce';

describe('AuthenticationProvider reduce', () => {
  describe('when the initial state is signed in', () => {
    const initialState = {
      isSignedIn: true,
    };

    describe('when the signIn action is passed', () => {
      it('returns the correct state', () => {
        const newState = reduce(signIn('', () => {}))(initialState);

        expect(newState).toEqual({
          isSignedIn: true,
        });
      });
    });

    describe('when the signOut action is passed', () => {
      it('returns the correct state', () => {
        const newState = reduce(signOut(() => {}))(initialState);

        expect(newState).toEqual({
          isSignedIn: false,
        });
      });
    });
  });

  describe('when the initial state is not signed in', () => {
    const initialState = {
      isSignedIn: false,
    };

    describe('when the signIn action is passed', () => {
      it('returns the correct state', () => {
        const newState = reduce(signIn('', () => {}))(initialState);

        expect(newState).toEqual({
          isSignedIn: true,
        });
      });
    });

    describe('when the signOut action is passed', () => {
      it('returns the correct state', () => {
        const newState = reduce(signOut(() => {}))(initialState);

        expect(newState).toEqual({
          isSignedIn: false,
        });
      });
    });
  });
});
