import { User } from 'spec/support/factories';

export const postSignIn = jest.fn(() => ({
  me: new User(),
  status: 200,
}));

export const postSignOut = jest.fn(() => ({
  status: 204,
}));
