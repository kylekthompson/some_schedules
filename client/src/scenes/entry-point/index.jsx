import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { Consumer } from 'components/authentication';
import PrivateRoute from 'components/private-route';
import App from 'scenes/app';
import Overview from 'scenes/overview';

export class EntryPoint extends Component {
  static propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
  };

  renderComponent = (ComponentToRender) => (props) => <ComponentToRender {...props} />

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

export default (props) => (
  <Consumer
    render={({ isSignedIn }) => (
      <EntryPoint
        isSignedIn={isSignedIn}
        {...props}
      />
    )}
  />
);
