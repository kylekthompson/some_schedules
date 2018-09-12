import React from 'react';
import Schedule from 'apps/schedule';
import { AuthenticationContextValue, Company, User } from 'spec/support/factories';
import { Route } from 'react-router-dom';
import { mountAsApp } from 'spec/support/mount';

function renderApp() {
  return (
    <>
      <Route path="/sign-in" render={() => <p>got sign in</p>} />
      <Route path="/sign-up" render={() => <p>got sign up</p>} />
      <Route path="/schedule" render={(renderProps) => <Schedule {...renderProps} />} />
    </>
  );
}

describe('<Schedule />', () => {
  describe('when signed in', () => {
    describe('when the user is not in a company', () => {
      it('redirects to /sign-up', () => {
        const { getByText } = mountAsApp(renderApp(), {
          authenticationContextValue: new AuthenticationContextValue().signedIn(new User({ company: null })),
          route: '/schedule',
        });

        getByText('got sign up');
      });
    });

    describe('when the user is in a company', () => {
      it('renders the schedule', () => {
        const { getByText } = mountAsApp(renderApp(), {
          authenticationContextValue: new AuthenticationContextValue().signedIn(new User({ company: new Company() })),
          route: '/schedule',
        });

        getByText('Schedule');
      });
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
