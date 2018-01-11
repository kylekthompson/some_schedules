import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import Overview from 'scenes/Overview';
import PrivateRoute from 'components/PrivateRoute';
import App from 'scenes/App';

export class Landing extends Component {
  static propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <Switch>
        <PrivateRoute
          component={App}
          isSignedIn={this.props.isSignedIn}
          path="/app"
        />
        <Route
          path="/"
          render={(props) => this.renderOverview(props)}
        />
      </Switch>
    );
  }

  renderOverview = (props) => (
    <Overview
      isSignedIn={this.props.isSignedIn}
      {...props}
    />
  )
}

export default withRouter(connect(
  (state) => ({
    isSignedIn: state.authentication.isSignedIn,
  }),
)(Landing));
