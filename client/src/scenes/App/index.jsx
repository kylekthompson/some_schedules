import React from 'react';

import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router-dom';

import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import { Container, HeaderContainer, HeaderLinks } from 'scenes/App/components';
import Schedule from 'scenes/Schedule';
import { header } from 'models/constants';

const App = ({ isSignedIn, requestSignOut }) => {
  if (!isSignedIn) { return <Redirect to="/" />; }

  return (
    <Container>
      <HeaderContainer>
        <Header theme={header.DARK_THEME}>
          <HeaderLinks requestSignOut={requestSignOut} />
        </Header>
      </HeaderContainer>
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
};

App.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  requestSignOut: PropTypes.func.isRequired,
};

export default App;
