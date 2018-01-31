import React from 'react';

import { mount } from 'enzyme';
import { Link, MemoryRouter as Router, Route, Switch } from 'react-router-dom';

import App from 'scenes/App';

const mountComponent = (props) => mount((
  <Router initialEntries={['/app']}>
    <Switch>
      <Route
        path="/app"
        render={(routeProps) => (
          <App
            isSignedIn={false}
            requestSignOut={() => {}}
            {...routeProps}
            {...props}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={() => null}
      />
    </Switch>
  </Router>
));

describe('<App />', () => {
  describe('when signed in', () => {
    it('renders the App', () => {
      const wrapper = mountComponent({
        isSignedIn: true,
      });

      expect(wrapper.contains(App)).toEqual(true);
    });

    describe('when clicking sign out', () => {
      it('calls requestSignOut()', () => {
        const requestSignOut = jest.fn();
        const wrapper = mountComponent({
          isSignedIn: true,
          requestSignOut,
        });

        wrapper.find(Link).filterWhere((link) => link.props().onClick === requestSignOut).props().onClick();

        expect(requestSignOut).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when signed out', () => {
    it('renders a redirect to /', () => {
      const wrapper = mountComponent({
        isSignedIn: false,
      });

      expect(wrapper.contains(App)).toEqual(false);
    });
  });
});
