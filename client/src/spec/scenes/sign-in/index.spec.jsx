import React from 'react';

import { mount } from 'enzyme';

import SignIn from 'scenes/sign-in';
import { AuthenticationContextValue } from 'spec/factories';
import { Provider } from 'spec/mocks/components/authentication';
import { findTestId, waitUntil } from 'spec/utilities';

const createSignIn = (callback = () => {}) => {
  const data = {
    context: {
      isSignedIn: true,
    },
  };

  return jest.fn().mockReturnValue(
    new Promise((resolve) => {
      resolve(data);
      callback();
    }),
  );
};

const mountComponent = (props) =>
  mount(
    <Provider value={new AuthenticationContextValue(props.value)}>
      <SignIn signIn={createSignIn()} {...props} />
    </Provider>,
  );

describe('<SignIn />', () => {
  describe('signing in', () => {
    it('calls signIn()', () => {
      const signIn = createSignIn();
      const wrapper = mountComponent({
        signIn,
      });

      findTestId(wrapper, 'sign-in-form')
        .props()
        .onSubmit();

      expect(signIn).toHaveBeenCalledTimes(1);
    });

    it('calls requestSignIn() when the sign in was a success', async (done) => {
      let resolved = false;
      const requestSignIn = jest.fn();
      const signIn = createSignIn(() => {
        resolved = true;
      });
      const wrapper = mountComponent({
        signIn,
        value: {
          requestSignIn,
        },
      });

      findTestId(wrapper, 'sign-in-form')
        .props()
        .onSubmit();
      await waitUntil(() => resolved === true);

      expect(requestSignIn).toHaveBeenCalledTimes(1);

      done();
    });
  });
});
