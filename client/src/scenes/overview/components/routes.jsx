import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import About from 'components/about';
import SignIn from 'scenes/sign-in';
import SignUp from 'scenes/sign-up';

const publicRoutes = [
  {
    exact: true,
    path: '/',
    render: (props) => <About {...props} />,
  },
  {
    exact: true,
    path: '/sign-in',
    render: (props) => <SignIn {...props} />,
  },
  {
    exact: true,
    path: '/sign-up',
    render: (props) => <SignUp {...props} />,
  },
];

class Routes extends Component {
  renderPublicRoutes = () => publicRoutes.map((route) => (
    <Route
      key={`public-${route.path}`}
      {...route}
    />
  ))

  render() {
    return (
      <Switch>
        {this.renderPublicRoutes()}
      </Switch>
    );
  }
}

export default Routes;
