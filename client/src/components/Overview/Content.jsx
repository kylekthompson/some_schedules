import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import About from 'components/About';
import SignIn from 'scenes/SignIn';
import SignUp from 'scenes/SignUp';

export default class Content extends Component {
  static propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
  };

  get publicRoutes() {
    return ([
      {
        exact: true,
        path: '/',
        component: About,
      },
      {
        exact: true,
        path: '/sign-in',
        component: SignIn,
      },
      {
        exact: true,
        path: '/sign-up',
        component: SignUp,
      },
    ]);
  }

  render() {
    return (
      <Switch>
        {this.renderPublicRoutes()}
      </Switch>
    );
  }

  renderPublicRoutes = () => this.publicRoutes.map((route) => (
    <Route
      key={`public-${route.path}`}
      {...route}
    />
  ));
}
