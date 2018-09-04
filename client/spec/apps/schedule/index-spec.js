import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Schedule } from 'apps/schedule';
import { mountAsApp } from 'spec/support/mount';

function renderApp(props) {
  return (
    <Fragment>
      <Route path="/sign-in" render={() => <p>got sign in</p>} />
      <Route path="/schedule" render={(renderProps) => <Schedule {...props} {...renderProps} />} />
    </Fragment>
  );
}

describe('<Schedule />', () => {
  describe('when signed in', () => {
    it('renders the schedule', () => {
      const { getByText } = mountAsApp(renderApp({ isSignedIn: true }), { route: '/schedule' });

      getByText('Schedule');
    });
  });

  describe('when signed out', () => {
    it('redirects to /sign-in', () => {
      const { getByText } = mountAsApp(renderApp({ isSignedIn: false }), { route: '/schedule' });

      getByText('got sign in');
    });
  });
});
