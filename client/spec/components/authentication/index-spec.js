import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { AuthenticationContext } from 'spec/support/factories';
import { Provider, authenticated } from 'components/authentication';
import { getAuthentication } from 'apis/contexts';
import { mount } from 'spec/support/mount';
import { postSignOut } from 'apis/authentication';

jest.mock('apis/authentication');
jest.mock('apis/contexts');

function Consumer({ isSignedIn, requestSignIn, requestSignOut, role }) {
  return (
    <Fragment>
      <a onClick={() => requestSignOut()}>Request Sign Out</a>
      <a onClick={() => requestSignIn(new AuthenticationContext().signedIn())}>Request Sign In</a>
      <p>{isSignedIn ? 'Signed In' : 'Signed Out'}</p>
      <p>Role: {role ? role : 'No Role'}</p>
    </Fragment>
  );
}

Consumer.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  requestSignIn: PropTypes.func.isRequired,
  requestSignOut: PropTypes.func.isRequired,
  role: PropTypes.string,
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
      getAuthentication.mockImplementationOnce(() => ({
        context: new AuthenticationContext().signedIn(),
        status: 200,
      }));

      const { click, getByText, wait } = mount(<App />);

      getByText('Signed Out');
      getByText('Role: No Role');

      await wait(() => expect(getAuthentication).toHaveBeenCalledTimes(1));

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
      getAuthentication.mockImplementationOnce(() => ({
        context: new AuthenticationContext().signedOut(),
        status: 200,
      }));

      const { click, getByText, wait } = mount(<App />);

      getByText('Signed Out');
      getByText('Role: No Role');

      await wait(() => expect(getAuthentication).toHaveBeenCalledTimes(1));

      getByText('Signed Out');
      getByText('Role: No Role');

      click(getByText('Request Sign In'));

      getByText('Signed In');
      getByText('Role: employee');
    });
  });
});
