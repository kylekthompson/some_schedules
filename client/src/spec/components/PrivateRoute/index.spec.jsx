import React from 'react';

import { mount } from 'enzyme';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';

const Component = () => <p>Component</p>;
const SignIn = () => <p>Sign In</p>;
const mountComponent = (props) => mount((
  <Router initialEntries={['/private']}>
    <Switch>
      <PrivateRoute
        component={Component}
        exact
        isSignedIn={false}
        path="/private"
        {...props}
      />
      <Route
        component={SignIn}
        exact
        path="/sign-in"
      />
    </Switch>
  </Router>
));

describe('<PrivateRoute />', () => {
  describe('when signed in', () => {
    it('renders the component', () => {
      const wrapper = mountComponent({
        isSignedIn: true,
      });

      expect(wrapper.contains(Component)).toEqual(true);
    });

    describe('when there are extra props for the component', () => {
      it('passes them', () => {
        const componentProps = {
          propOne: 'propOne',
          propTwo: 'propTwo',
        };
        const wrapper = mountComponent({
          componentProps,
          isSignedIn: true,
        });

        const component = wrapper.find(Component);
        Object.keys(componentProps).forEach((prop) => {
          expect(component.prop(prop)).toEqual(componentProps[prop]);
        });
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
