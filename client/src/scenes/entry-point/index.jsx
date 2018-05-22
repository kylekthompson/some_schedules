import App from 'scenes/app';
import Overview from 'scenes/overview';
import PrivateRoute from 'components/private-route';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { authenticated } from 'components/authentication';

export class EntryPoint extends Component {
  static propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
  };

  renderComponent = (ComponentToRender) => (props) => (
    <ComponentToRender {...props} />
  );

  render() {
    return (
      <Switch>
        <PrivateRoute
          isSignedIn={this.props.isSignedIn}
          path="/app"
          render={this.renderComponent(App)}
        />
        <Route path="/" render={this.renderComponent(Overview)} />
      </Switch>
    );
  }
}

export default authenticated(EntryPoint);
