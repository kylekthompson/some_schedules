import { User } from 'spec/support/factories';

export const getMe = jest.fn(() => ({
  me: new User(),
  status: 200,
}));
