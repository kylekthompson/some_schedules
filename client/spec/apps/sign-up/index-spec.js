import React from 'react';
import SignUp from 'apps/sign-up';
import { AuthenticationContextValue, Company, User } from 'spec/support/factories';
import { Route, Switch } from 'react-router-dom';
import { mountAsApp } from 'spec/support/mount';

function App() {
  return (
    <Switch>
      <Route component={SignUp} path="/sign-up" />
      <Route path="/" render={() => <p>got home</p>} />
    </Switch>
  );
}

describe('<SignUp />', () => {
  describe('when the user is completely signed up', () => {
    it('redirects to home', () => {
      const { getByText } = mountAsApp(<App />, {
        authenticationContextValue: new AuthenticationContextValue().signedIn(new User({ company: new Company() })),
        route: '/sign-up',
      });
      getByText('got home');
    });
  });

  describe('when the user has not filled out the company form', () => {
    it('redirects to the company form', () => {
      const { getByText } = mountAsApp(<App />, {
        authenticationContextValue: new AuthenticationContextValue().signedIn(new User({ company: null })),
        route: '/sign-up',
      });
      getByText('Sign Up - Company');
    });

    it('cannot reach the user form', () => {
      const { getByText } = mountAsApp(<App />, {
        authenticationContextValue: new AuthenticationContextValue().signedIn(new User({ company: null })),
        route: '/sign-up/user',
      });
      getByText('Sign Up - Company');
    });
  });

  describe('when there is no user', () => {
    it('redirects to the user form', () => {
      const { getByText } = mountAsApp(<App />, {
        authenticationContextValue: new AuthenticationContextValue().signedOut(),
        route: '/sign-up',
      });
      getByText('Sign Up - User');
    });

    it('cannot reach the user form', () => {
      const { getByText } = mountAsApp(<App />, {
        authenticationContextValue: new AuthenticationContextValue().signedOut(),
        route: '/sign-up/company',
      });
      getByText('Sign Up - User');
    });
  });
});
