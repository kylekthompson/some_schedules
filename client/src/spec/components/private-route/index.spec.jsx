import React from 'react';

import { mount } from 'enzyme';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from 'components/private-route';

const Component = () => <p>Component</p>;
const SignIn = () => <p>Sign In</p>;
const mountComponent = (props) =>
  mount(
    <Router initialEntries={['/private']}>
      <Switch>
        <PrivateRoute
          component={Component}
          exact
          isSignedIn={false}
          path="/private"
          {...props}
        />
        <Route component={SignIn} exact path="/sign-in" />
      </Switch>
    </Router>,
  );

describe('<PrivateRoute />', () => {
  describe('when signed in', () => {
    describe('when passed a component', () => {
      it('renders the component', () => {
        const wrapper = mountComponent({
          component: Component,
          isSignedIn: true,
          render: null,
        });

        expect(wrapper.contains(Component)).toEqual(true);
      });
    });

    describe('when passed a render prop', () => {
      it('renders the render prop', () => {
        const wrapper = mountComponent({
          component: null,
          isSignedIn: true,
          render: () => <Component />,
        });

        expect(wrapper.contains(Component)).toEqual(true);
      });
    });
  });

  describe('when signed out', () => {
    it('renders a redirect to sign-in', () => {
      const wrapper = mountComponent({
        isSignedIn: false,
      });

      expect(wrapper.contains(SignIn)).toEqual(true);
    });
  });
});
