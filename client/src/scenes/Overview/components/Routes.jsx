import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import About from 'components/About';
import SignIn from 'scenes/SignIn';
import SignUp from 'scenes/SignUp';

class Routes extends Component {
  static propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
    requestSignIn: PropTypes.func.isRequired,
    requestSignOut: PropTypes.func.isRequired,
  };

  get authenticationProps() {
    return {
      isSignedIn: this.props.isSignedIn,
      requestSignIn: this.props.requestSignIn,
      requestSignOut: this.props.requestSignOut,
    };
  }

  get publicRoutes() {
    return ([
      {
        exact: true,
        path: '/',
        render: (props) => <About {...props} {...this.authenticationProps} />,
      },
      {
        exact: true,
        path: '/sign-in',
        render: (props) => <SignIn {...props} {...this.authenticationProps} />,
      },
      {
        exact: true,
        path: '/sign-up',
        render: (props) => <SignUp {...props} {...this.authenticationProps} />,
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

export default Routes;
