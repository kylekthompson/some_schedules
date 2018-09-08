import React from 'react';
import SignIn from 'apps/sign-in';
import { AuthenticationContext } from 'spec/support/factories';
import { Redirect, Route, Switch } from 'react-router-dom';
import { mountAsApp } from 'spec/support/mount';
import { postSignIn } from 'apis/authentication';

jest.mock('apis/authentication');

function renderApp(state = null) {
  return (
    <Switch>
      <Redirect
        from="/starting-route"
        to={{ pathname: '/sign-in', state }}
      />
      <Route path="/sign-in" render={(renderProps) => <SignIn {...renderProps} />} />
      <Route path="/from" render={() => <p>got from</p>} />
      <Route path="/" render={() => <p>got home</p>} />
    </Switch>
  );
}

describe('<SignIn />', () => {
  describe('when signed in', () => {
    describe('when from is passed through location state', () => {
      it('redirects to the from route', () => {
        const { getByText } = mountAsApp(renderApp({ from: '/from' }), {
          authenticationContext: new AuthenticationContext().signedIn().withRequests(),
          route: '/starting-route',
        });

        getByText('got from');
      });
    });

    describe('when from is not passed through location state', () => {
      it('redirects to the home route', () => {
        const { getByText } = mountAsApp(renderApp(), {
          authenticationContext: new AuthenticationContext().signedIn().withRequests(),
          route: '/starting-route',
        });

        getByText('got home');
      });
    });
  });

  describe('when signed out', () => {
    describe('when the sign in is successful', () => {
      it('handles the sign in', async () => {
        const authenticationContext = new AuthenticationContext().signedOut().withRequests();
        const { enterValue, click, getByPlaceholderText, getByText, wait } = mountAsApp(renderApp(), {
          authenticationContext,
          route: '/starting-route',
        });

        const newContext = new AuthenticationContext().signedIn();
        postSignIn.mockImplementationOnce(() => ({
          context: newContext,
          status: 200,
        }));

        enterValue(getByPlaceholderText('Email'), 'some@email.com');
        enterValue(getByPlaceholderText('Password'), 'password');

        click(getByText('Submit').parentElement);

        expect(postSignIn).toHaveBeenCalledTimes(1);
        expect(postSignIn).toHaveBeenCalledWith({
          email: 'some@email.com',
          password: 'password',
        });

        await wait(() => expect(authenticationContext.requestSignIn).toHaveBeenCalledTimes(1));
        expect(authenticationContext.requestSignIn).toHaveBeenCalledWith(newContext);
      });
    });

    describe('when the sign in is not successful', () => {
      it('does not handle the sign in', async () => {
        const authenticationContext = new AuthenticationContext().signedOut().withRequests();
        const { enterValue, click, getByPlaceholderText, getByText } = mountAsApp(renderApp(), {
          authenticationContext,
          route: '/starting-route',
        });

        const newContext = new AuthenticationContext().signedOut();
        postSignIn.mockImplementationOnce(() => ({
          context: newContext,
          status: 401,
        }));

        enterValue(getByPlaceholderText('Email'), 'some@email.com');
        enterValue(getByPlaceholderText('Password'), 'password');

        click(getByText('Submit').parentElement);

        expect(postSignIn).toHaveBeenCalledTimes(1);
        expect(postSignIn).toHaveBeenCalledWith({
          email: 'some@email.com',
          password: 'password',
        });

        await Promise.resolve(); // wait a tick for promises to resolve

        expect(authenticationContext.requestSignIn).toHaveBeenCalledTimes(0);
      });
    });
  });
});
