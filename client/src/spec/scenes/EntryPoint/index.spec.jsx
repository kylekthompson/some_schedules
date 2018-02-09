import React from 'react';

import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';

import App from 'scenes/App';
import EntryPoint from 'scenes/EntryPoint';
import Overview from 'scenes/Overview';

const mountComponent = (props, initialRoute = '/app') => mount((
  <Router initialEntries={[initialRoute]}>
    <EntryPoint
      isSignedIn={false}
      requestSignIn={() => {}}
      requestSignOut={() => {}}
      {...props}
    />
  </Router>
));

describe('<EntryPoint />', () => {
  describe('when signed in', () => {
    describe('when going to /app', () => {
      it('renders App', () => {
        const wrapper = mountComponent({
          isSignedIn: true,
        }, '/app');

        expect(wrapper.find(App)).toHaveLength(1);
        expect(wrapper.find(Overview)).toHaveLength(0);
      });
    });

    describe('when going to /', () => {
      it('renders Overview', () => {
        const wrapper = mountComponent({
          isSignedIn: true,
        }, '/');

        expect(wrapper.find(App)).toHaveLength(0);
        expect(wrapper.find(Overview)).toHaveLength(1);
      });
    });
  });

  describe('when signed out', () => {
    describe('when going to /app', () => {
      it('renders Overview', () => {
        const wrapper = mountComponent({
          isSignedIn: false,
        }, '/app');

        expect(wrapper.find(App)).toHaveLength(0);
        expect(wrapper.find(Overview)).toHaveLength(1);
      });
    });

    describe('when going to /', () => {
      it('renders Overview', () => {
        const wrapper = mountComponent({
          isSignedIn: false,
        }, '/');

        expect(wrapper.find(App)).toHaveLength(0);
        expect(wrapper.find(Overview)).toHaveLength(1);
      });
    });
  });
});
