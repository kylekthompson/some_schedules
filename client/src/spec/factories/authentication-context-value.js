import Factory from 'spec/factories/factory';

class AuthenticationContextValue extends Factory {
  constructor(value = {}) {
    super({
      isAdmin: false,
      isSignedIn: false,
      requestSignIn: jest.fn().mockReturnValue(Promise.resolve()),
      requestSignOut: jest.fn().mockReturnValue(Promise.resolve()),
      role: null,
      ...value,
    });
  }
}

export default AuthenticationContextValue;
