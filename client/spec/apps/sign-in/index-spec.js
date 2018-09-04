import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SignIn } from 'apps/sign-in';
import { mountAsApp } from 'spec/support/mount';

function renderApp(props, state = null) {
  return (
    <Switch>
      <Redirect
        from="/starting-route"
        to={{ pathname: '/sign-in', state }}
      />
      <Route path="/sign-in" render={(renderProps) => <SignIn {...props} {...renderProps} />} />
      <Route path="/from" render={() => <p>got from</p>} />
      <Route path="/" render={() => <p>got home</p>} />
    </Switch>
  );
}

describe('<SignIn />', () => {
  describe('when signed in', () => {
    describe('when from is passed through location state', () => {
      it('redirects to the from route', () => {
        const { getByText } = mountAsApp(renderApp({ isSignedIn: true }, { from: '/from' }), { route: '/starting-route' });

        getByText('got from');
      });
    });

    describe('when from is not passed through location state', () => {
      it('redirects to the home route', () => {
        const { getByText } = mountAsApp(renderApp({ isSignedIn: true }), { route: '/starting-route' });

        getByText('got home');
      });
    });
  });

  describe('when signed out', () => {
    it('renders the sign in page', () => {
      const { getByText } = mountAsApp(renderApp({ isSignedIn: false }), { route: '/starting-route' });

      getByText('Sign In App');
    });
  });
});
