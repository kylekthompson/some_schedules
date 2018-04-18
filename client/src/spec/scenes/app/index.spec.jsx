import React from 'react';

import { mount } from 'enzyme';
import { Link, MemoryRouter as Router, Route, Switch } from 'react-router-dom';

import App from 'scenes/app';
import { AuthenticationContextValue } from 'spec/factories';
import { Provider } from 'spec/mocks/components/authentication';

const mountComponent = (props = {}) =>
  mount(
    <Provider value={new AuthenticationContextValue(props.value)}>
      <Router initialEntries={['/app']}>
        <Switch>
          <Route
            path="/app"
            render={(routeProps) => <App {...routeProps} {...props} />}
          />
          <Route exact path="/" render={() => null} />
        </Switch>
      </Router>
    </Provider>,
  );

describe('<App />', () => {
  describe('when signed in', () => {
    it('renders the App', () => {
      const wrapper = mountComponent({
        value: {
          isSignedIn: true,
        },
      });

      expect(wrapper.contains(App)).toEqual(true);
    });

    describe('when clicking sign out', () => {
      it('calls requestSignOut()', () => {
        const requestSignOut = jest.fn();
        const wrapper = mountComponent({
          value: {
            isSignedIn: true,
            requestSignOut,
          },
        });

        wrapper
          .find(Link)
          .filterWhere((link) => link.props().onClick === requestSignOut)
          .props()
          .onClick();

        expect(requestSignOut).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when signed out', () => {
    it('renders a redirect to /', () => {
      const wrapper = mountComponent({
        value: {
          isSignedIn: false,
        },
      });

      expect(wrapper.contains(App)).toEqual(false);
    });
  });
});
