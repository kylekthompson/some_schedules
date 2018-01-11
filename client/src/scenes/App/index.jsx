import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Header from 'components/Header';
import { Container, HeaderLinks } from 'components/App';
import PrivateRoute from 'components/PrivateRoute';
import Schedule from 'scenes/Schedule';
import { requestSignOut } from 'services/store/Authentication/actionCreators';

export class App extends Component {
  static propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
    requestSignOut: PropTypes.func.isRequired,
  };

  render() {
    if (!this.props.isSignedIn) { return <Redirect to="/" />; }

    const {
      isSignedIn,
      requestSignOut,
    } = this.props;

    return (
      <Container>
        <Header darkTheme>
          <HeaderLinks requestSignOut={requestSignOut} />
        </Header>
        <Switch>
          <PrivateRoute
            component={Schedule}
            exact
            isSignedIn={isSignedIn}
            path="/app/schedule"
          />
        </Switch>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    isSignedIn: state.authentication.isSignedIn,
  }),
  (dispatch) => ({
    ...bindActionCreators({
      requestSignOut,
    }, dispatch),
  }),
)(App);
