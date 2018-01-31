import React from 'react';

import { mount } from 'enzyme';

import SignUp from 'scenes/SignUp';
import { findTestId, waitUntil } from 'spec/utilities';

const createSignUp = (callback = () => {}) => {
  const data = {
    signUp: {
      token: 'token',
    },
  };

  return jest.fn().mockReturnValue(new Promise((resolve) => {
    resolve({ data });
    callback();
  }));
};

const mountComponent = (props) => mount((
  <SignUp
    isSignedIn={false}
    requestSignIn={jest.fn()}
    signUp={createSignUp()}
    {...props}
  />
));

describe('<SignUp />', () => {
  describe('signing in', () => {
    it('calls signUp()', () => {
      const signUp = createSignUp();
      const wrapper = mountComponent({
        signUp,
      });

      findTestId(wrapper, 'sign-up-form').props().onSubmit({});

      expect(signUp).toHaveBeenCalledTimes(1);
    });

    it('calls requestSignIn() when the sign in was a success', async (done) => {
      let resolved = false;
      const requestSignIn = jest.fn();
      const signUp = createSignUp(() => {
        resolved = true;
      });
      const wrapper = mountComponent({
        requestSignIn,
        signUp,
      });

      findTestId(wrapper, 'sign-up-form').props().onSubmit({});
      await waitUntil(() => resolved === true);

      expect(requestSignIn).toHaveBeenCalledTimes(1);

      done();
    });
  });
});
