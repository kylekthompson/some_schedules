import Factory from 'spec/support/factories/factory';
import User from 'src/models/user';

export default class AuthenticationContext extends Factory {
  constructor(value = {}) {
    super({
      isSignedIn: false,
      role: null,
      ...value,
    });
  }

  signedIn(role = User.Role.EMPLOYEE) {
    this.isSignedIn = true;
    this.role = role;
    return this;
  }

  signedOut() {
    this.isSignedIn = false;
    this.role = null;
    return this;
  }

  withRequests() {
    this.requestSignIn = jest.fn((context) => Object.assign(this, context));
    this.requestSignOut = jest.fn(() => Object.assign(this, {
      isSignedIn: false,
      role: null,
    }));

    return this;
  }
}
