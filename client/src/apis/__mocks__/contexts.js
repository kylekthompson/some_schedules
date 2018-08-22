import { AuthenticationContext } from 'spec/support/factories';

export const getAuthentication = jest.fn(() => ({
  context: new AuthenticationContext().signedIn(),
  status: 200,
}));

export const getSchedule = jest.fn(() => ({
  context: {},
  status: 200,
}));
