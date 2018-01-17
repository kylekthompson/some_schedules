import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router-dom';

import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import { Container, HeaderContainer, HeaderLinks } from 'scenes/App/components';
import Schedule from 'scenes/Schedule';

export class App extends Component {
  static propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
  };

  render() {
    if (!this.props.isSignedIn) { return <Redirect to="/" />; }

    return (
      <Container>
        <HeaderContainer>
          <Header darkTheme>
            <HeaderLinks requestSignOut={this.props.requestSignOut} />
          </Header>
        </HeaderContainer>
        <Switch>
          <PrivateRoute
            component={Schedule}
            exact
            isSignedIn={this.props.isSignedIn}
            path="/app/schedule"
          />
        </Switch>
      </Container>
    );
  }
}

export default App;
