import About from 'scenes/overview/about';
import Header from 'components/header';
import HeaderLinks from 'scenes/overview/header-links';
import PropTypes from 'prop-types';
import React from 'react';
import SignIn from 'scenes/overview/sign-in';
import SignUp from 'scenes/overview/sign-up';
import { Container } from 'scenes/overview/styled-components';
import { Route, Switch } from 'react-router-dom';
import { authenticated } from 'components/authentication';

export function Overview({ isSignedIn }) {
  return (
    <Container>
      <Header>
        <HeaderLinks isSignedIn={isSignedIn} />
      </Header>
      <Switch>
        <Route exact path="/" component={About} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    </Container>
  );
}

Overview.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

export default authenticated(Overview);
