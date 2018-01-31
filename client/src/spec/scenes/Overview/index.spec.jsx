import React from 'react';

import { mount } from 'enzyme';
import { Link, MemoryRouter as Router } from 'react-router-dom';

import Overview from 'scenes/Overview';
import SignIn from 'scenes/SignIn';
import SignUp from 'scenes/SignUp';

const mountComponent = (props, initialRoute = '/app') => mount((
  <Router initialEntries={[initialRoute]}>
    <Overview
      isSignedIn={false}
      requestSignIn={() => {}}
      requestSignOut={() => {}}
      {...props}
    />
  </Router>
));

describe('<Overview />', () => {
  describe('when signed in', () => {
    it('renders a link to the schedule', () => {
      const wrapper = mountComponent({
        isSignedIn: true,
      }, '/');

      const scheduleLink = wrapper.find(Link).filterWhere((link) => link.props().to === '/app/schedule');

      expect(scheduleLink).toHaveLength(1);
    });
  });

  describe('when signed out', () => {
    it('renders a link to sign in', () => {
      const wrapper = mountComponent({
        isSignedIn: false,
      }, '/');

      const signInLink = wrapper.find(Link).filterWhere((link) => link.props().to === '/sign-in');

      expect(signInLink).toHaveLength(1);
    });

    it('renders a link to sign up', () => {
      const wrapper = mountComponent({
        isSignedIn: false,
      }, '/');

      const signUpLink = wrapper.find(Link).filterWhere((link) => link.props().to === '/sign-up');

      expect(signUpLink).toHaveLength(1);
    });

    describe('when going to /sign-in', () => {
      it('renders SignIn', () => {
        const wrapper = mountComponent({
          isSignedIn: false,
        }, '/sign-in');

        expect(wrapper.find(SignIn)).toHaveLength(1);
      });
    });

    describe('when going to /sign-up', () => {
      it('renders SignUp', () => {
        const wrapper = mountComponent({
          isSignedIn: false,
        }, '/sign-up');

        expect(wrapper.find(SignUp)).toHaveLength(1);
      });
    });
  });
});
