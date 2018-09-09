import Factory from 'spec/support/factories/factory';
import User from 'spec/support/factories/user';

export default class AuthenticationContextValue extends Factory {
  constructor(value = {}) {
    super({
      requestSignIn: jest.fn((user) => Object.assign(this, { user })),
      requestSignOut: jest.fn(() => Object.assign(this, { user: null })),
      user: new User(),
      ...value,
    });
  }

  signedIn() {
    this.user = new User();
    return this;
  }

  signedOut() {
    this.user = null;
    return this;
  }
}
