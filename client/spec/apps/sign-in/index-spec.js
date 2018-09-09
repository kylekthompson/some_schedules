import React from 'react';
import SignIn from 'apps/sign-in';
import { AuthenticationContextValue, User } from 'spec/support/factories';
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
          authenticationContextValue: new AuthenticationContextValue().signedIn(),
          route: '/starting-route',
        });

        getByText('got from');
      });
    });

    describe('when from is not passed through location state', () => {
      it('redirects to the home route', () => {
        const { getByText } = mountAsApp(renderApp(), {
          authenticationContextValue: new AuthenticationContextValue().signedIn(),
          route: '/starting-route',
        });

        getByText('got home');
      });
    });
  });

  describe('when signed out', () => {
    describe('when the sign in is successful', () => {
      it('handles the sign in', async () => {
        const authenticationContextValue = new AuthenticationContextValue().signedOut();
        const { enterValue, click, getByPlaceholderText, getByText, wait } = mountAsApp(renderApp(), {
          authenticationContextValue,
          route: '/starting-route',
        });

        const user = new User();
        postSignIn.mockImplementationOnce(() => ({
          me: user,
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

        await wait(() => expect(authenticationContextValue.requestSignIn).toHaveBeenCalledTimes(1));
        expect(authenticationContextValue.requestSignIn).toHaveBeenCalledWith(user);
      });
    });

    describe('when the sign in is not successful', () => {
      it('does not handle the sign in', async () => {
        const authenticationContextValue = new AuthenticationContextValue().signedOut();
        const { enterValue, click, getByPlaceholderText, getByText } = mountAsApp(renderApp(), {
          authenticationContextValue,
          route: '/starting-route',
        });

        postSignIn.mockImplementationOnce(() => ({
          me: null,
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

        expect(authenticationContextValue.requestSignIn).toHaveBeenCalledTimes(0);
      });
    });
  });
});
