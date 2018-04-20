import Factory from 'spec/factories/factory';

class AuthenticationContext extends Factory {
  constructor(value = {}) {
    super({
      isAdmin: false,
      isSignedIn: false,
      role: null,
      ...value,
    });
  }
}

export default AuthenticationContext;
