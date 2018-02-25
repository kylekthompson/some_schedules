import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { Consumer } from 'components/Authentication';
import PrivateRoute from 'components/PrivateRoute';
import App from 'scenes/App';
import Overview from 'scenes/Overview';

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
