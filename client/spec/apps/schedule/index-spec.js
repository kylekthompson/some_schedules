import React from 'react';
import Schedule from 'apps/schedule';
import { AuthenticationContextValue } from 'spec/support/factories';
import { Route } from 'react-router-dom';
import { mountAsApp } from 'spec/support/mount';

function renderApp() {
  return (
    <>
      <Route path="/sign-in" render={() => <p>got sign in</p>} />
      <Route path="/schedule" render={(renderProps) => <Schedule {...renderProps} />} />
    </>
  );
}

describe('<Schedule />', () => {
  describe('when signed in', () => {
    it('renders the schedule', () => {
      const { getByText } = mountAsApp(renderApp(), {
        authenticationContextValue: new AuthenticationContextValue().signedIn(),
        route: '/schedule',
      });

      getByText('Schedule');
    });
  });

  describe('when signed out', () => {
    it('redirects to /sign-in', () => {
      const { getByText } = mountAsApp(renderApp(), {
        authenticationContextValue: new AuthenticationContextValue().signedOut(),
        route: '/schedule',
      });

      getByText('got sign in');
    });
  });
});
