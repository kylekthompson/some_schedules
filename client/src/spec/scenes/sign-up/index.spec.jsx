import React from 'react';

import { mount } from 'enzyme';

import SignUp from 'scenes/sign-up';
import { AuthenticationContextValue } from 'spec/factories';
import { Provider } from 'spec/mocks/components/authentication';
import { findTestId, waitUntil } from 'spec/utilities';

const createSignUp = (callback = () => {}) => {
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
    <Provider
      value={
        new AuthenticationContextValue({ isSignedIn: false, ...props.value })
      }
    >
      <SignUp signUp={createSignUp()} {...props} />
    </Provider>,
  );

describe('<SignUp />', () => {
  describe('signing up', () => {
    it('calls signUp()', () => {
      const signUp = createSignUp();
      const wrapper = mountComponent({
        signUp,
      });

      findTestId(wrapper, 'sign-up-form')
        .props()
        .onSubmit({});

      expect(signUp).toHaveBeenCalledTimes(1);
    });

    it('calls requestSignIn() when the sign up was a success', async (done) => {
      const requestSignIn = jest.fn();
      const signUp = createSignUp();
      const wrapper = mountComponent({
        value: {
          requestSignIn,
        },
        signUp,
      });

      findTestId(wrapper, 'sign-up-form')
        .props()
        .onSubmit({});

      await waitUntil(() => requestSignIn.mock.calls.length >= 1);
      done();
    });
  });
});
