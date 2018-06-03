import Header from 'components/header';
import HeaderLinks from 'scenes/app/header-links';
import PrivateRoute from 'components/private-route';
import PropTypes from 'prop-types';
import React from 'react';
import Schedule from 'scenes/app/schedule';
import { Container, HeaderContainer } from 'scenes/app/styled-components';
import { Redirect, Switch } from 'react-router-dom';
import { authenticated } from 'components/authentication';
import { header } from 'models/constants';

export function App({ isSignedIn, requestSignOut }) {
  if (!isSignedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <HeaderContainer>
        <Header theme={header.DARK_THEME}>
          <HeaderLinks requestSignOut={requestSignOut} />
        </Header>
      </HeaderContainer>
      <Switch>
        <PrivateRoute
          exact
          isSignedIn={isSignedIn}
          path="/app/schedule"
          component={Schedule}
        />
      </Switch>
    </Container>
  );
}

App.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  requestSignOut: PropTypes.func.isRequired,
};

export default authenticated(App);
