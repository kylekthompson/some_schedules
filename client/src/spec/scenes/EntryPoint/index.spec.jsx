import React from 'react';

import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';

import App from 'scenes/App';
import EntryPoint from 'scenes/EntryPoint';
import Overview from 'scenes/Overview';
import { AuthenticationContextValue } from 'spec/factories';
import { Provider } from 'spec/mocks/components/Authentication';

const mountComponent = (props = {}, initialRoute = '/app') => mount((
  <Provider value={new AuthenticationContextValue(props.value)}>
    <Router initialEntries={[initialRoute]}>
      <EntryPoint {...props} />
    </Router>
  </Provider>
));

describe('<EntryPoint />', () => {
  describe('when signed in', () => {
    describe('when going to /app', () => {
      it('renders App', () => {
        const wrapper = mountComponent({
          value: {
            isSignedIn: true,
          },
        }, '/app');

        expect(wrapper.find(App)).toHaveLength(1);
        expect(wrapper.find(Overview)).toHaveLength(0);
      });
    });

    describe('when going to /', () => {
      it('renders Overview', () => {
        const wrapper = mountComponent({
          value: {
            isSignedIn: true,
          },
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
          value: {
            isSignedIn: false,
          },
        }, '/app');

        expect(wrapper.find(App)).toHaveLength(0);
        expect(wrapper.find(Overview)).toHaveLength(1);
      });
    });

    describe('when going to /', () => {
      it('renders Overview', () => {
        const wrapper = mountComponent({
          value: {
            isSignedIn: false,
          },
        }, '/');

        expect(wrapper.find(App)).toHaveLength(0);
        expect(wrapper.find(Overview)).toHaveLength(1);
      });
    });
  });
});
