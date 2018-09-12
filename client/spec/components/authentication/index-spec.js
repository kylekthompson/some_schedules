import PropTypes from 'prop-types';
import React from 'react';
import { Provider, authenticated } from 'components/authentication';
import { User } from 'spec/support/factories';
import { getMe } from 'apis/me';
import { mount } from 'spec/support/mount';
import { postSignOut } from 'apis/authentication';

jest.mock('apis/authentication');
jest.mock('apis/me');

function Consumer({ user, requestSignIn, requestSignOut }) {
  return (
    <>
      <a onClick={() => requestSignOut()}>Request Sign Out</a>
      <a onClick={() => requestSignIn(new User())}>Request Sign In</a>
      <p>{user ? 'Signed In' : 'Signed Out'}</p>
      <p>Role: {user ? user.role : 'No Role'}</p>
    </>
  );
}

Consumer.propTypes = {
  requestSignIn: PropTypes.func.isRequired,
  requestSignOut: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const AuthenticatedConsumer = authenticated(Consumer);

function App() {
  return (
    <Provider>
      <AuthenticatedConsumer />
    </Provider>
  );
}

describe('<AuthenticationProvider />', () => {
  describe('when the context comes back as authenticated', () => {
    it('handles authentication concerns', async () => {
      getMe.mockImplementationOnce(() => ({
        me: new User(),
        status: 200,
      }));

      const { click, getByText, wait } = mount(<App />);

      getByText('Signed Out');
      getByText('Role: No Role');

      await wait(() => expect(getMe).toHaveBeenCalledTimes(1));

      getByText('Signed In');
      getByText('Role: employee');

      expect(postSignOut).toHaveBeenCalledTimes(0);

      click(getByText('Request Sign Out'));

      expect(postSignOut).toHaveBeenCalledTimes(1);

      getByText('Signed Out');
      getByText('Role: No Role');
    });
  });

  describe('when the context comes back as unauthenticated', () => {
    it('handles authentication concerns', async () => {
      getMe.mockImplementationOnce(() => ({
        me: null,
        status: 200,
      }));

      const { click, getByText, wait } = mount(<App />);

      getByText('Signed Out');
      getByText('Role: No Role');

      await wait(() => expect(getMe).toHaveBeenCalledTimes(1));

      getByText('Signed Out');
      getByText('Role: No Role');

      click(getByText('Request Sign In'));

      getByText('Signed In');
      getByText('Role: employee');
    });
  });
});
