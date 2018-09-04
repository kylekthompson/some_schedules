import Header from 'components/entry-point/header';
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { mountAsApp } from 'spec/support/mount';

function App() {
  return (
    <Fragment>
      <Header />
      <Route path="/sign-in" render={() => <p>got sign in</p>} />
      <Route path="/sign-up" render={() => <p>got sign up</p>} />
      <Route path="/" render={() => <p>got home</p>} />
    </Fragment>
  );
}

describe('<Header />', () => {
  describe('the navigation links', () => {
    it('can navigate to /sign-in', () => {
      const { click, getByText } = mountAsApp(<App />, {
        route: '/',
      });

      click(getByText('Sign In'));

      getByText('got sign in');
    });

    it('can navigate to /sign-up', () => {
      const { click, getByText } = mountAsApp(<App />, {
        route: '/',
      });

      click(getByText('Sign Up'));

      getByText('got sign up');
    });
  });

  describe('the company name', () => {
    it('can navigate to /', () => {
      const { click, getByText } = mountAsApp(<App />, {
        route: '/sign-in',
      });

      click(getByText('SomeSchedules'));

      getByText('got home');
    });
  });
});
