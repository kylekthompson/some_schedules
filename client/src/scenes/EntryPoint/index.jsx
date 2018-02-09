import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';
import App from 'scenes/App';
import Overview from 'scenes/Overview';

class EntryPoint extends Component {
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

  renderComponent = (ComponentToRender) => (props) => (
    <ComponentToRender
      {...props}
      {...this.authenticationProps}
    />
  )

  render() {
    return (
      <Switch>
        <PrivateRoute
          isSignedIn={this.props.isSignedIn}
          path="/app"
          render={this.renderComponent(App)}
        />
        <Route
          path="/"
          render={this.renderComponent(Overview)}
        />
      </Switch>
    );
  }
}

export default EntryPoint;
