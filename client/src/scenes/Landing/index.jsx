import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';
import App from 'scenes/App';
import Overview from 'scenes/Overview';

class Landing extends Component {
  static propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
    requestSignIn: PropTypes.func.isRequired,
    requestSignOut: PropTypes.func.isRequired,
  };

  get componentProps() {
    return {
      isSignedIn: this.props.isSignedIn,
      requestSignIn: this.props.requestSignIn,
      requestSignOut: this.props.requestSignOut,
    };
  }

  renderOverview = (props) => (
    <Overview
      {...props}
      {...this.componentProps}
    />
  )

  render() {
    return (
      <Switch>
        <PrivateRoute
          component={App}
          componentProps={this.componentProps}
          isSignedIn={this.props.isSignedIn}
          path="/app"
        />
        <Route
          path="/"
          render={this.renderOverview}
        />
      </Switch>
    );
  }
}

export default Landing;
