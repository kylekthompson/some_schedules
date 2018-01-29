import React from 'react';

import { mount } from 'enzyme';
import Moment from 'moment-timezone';
import { Link, MemoryRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import SignIn from 'scenes/SignIn';
import { Company, User } from 'spec/factories';
import { findTestId, waitUntil } from 'spec/utilities';

const createSignIn = (callback = () => {}) => {
  const data = {
    signIn: {
      token: 'token',
    },
  };

  return jest.fn().mockReturnValue(new Promise((resolve) => {
    resolve({ data });
    callback();
  }));
};

const mountComponent = (props) => mount(
  <SignIn
    isSignedIn={false}
    requestSignIn={jest.fn()}
    signIn={createSignIn()}
    {...props}
  />
);

describe('<SignIn />', () => {
  describe('signing in', () => {
    it('calls signIn()', () => {
      const signIn = createSignIn();
      const wrapper = mountComponent({
        signIn,
      });

      findTestId(wrapper, 'sign-in-form').props().onSubmit();

      expect(signIn).toHaveBeenCalledTimes(1);
    });

    it('calls requestSignIn() when the sign in was a success', async (done) => {
      let resolved = false;
      const requestSignIn = jest.fn();
      const signIn = createSignIn(() => resolved = true);
      const wrapper = mountComponent({
        requestSignIn,
        signIn,
      });

      findTestId(wrapper, 'sign-in-form').props().onSubmit();
      await waitUntil(() => resolved === true);

      expect(requestSignIn).toHaveBeenCalledTimes(1);

      done();
    });
  });
});
