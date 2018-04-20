import { AuthenticationContext } from 'spec/factories';

export const getContext = jest.fn(() => ({
  context: new AuthenticationContext(),
  status: 200,
}));

export const postSignIn = jest.fn(() => ({
  context: new AuthenticationContext(),
  status: 200,
}));

export const postSignOut = jest.fn(() => ({
  status: 204,
}));

export const postSignUp = jest.fn(() => ({
  context: new AuthenticationContext(),
  status: 201,
}));
