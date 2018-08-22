import { AuthenticationContext } from 'spec/support/factories';

export const postSignIn = jest.fn(() => ({
  context: new AuthenticationContext().signedIn(),
  status: 200,
}));

export const postSignOut = jest.fn(() => ({
  status: 204,
}));
