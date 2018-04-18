import React from 'react';

import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router-dom';

import { Consumer } from 'components/authentication';
import Header from 'components/header';
import HeaderLinksProvider from 'components/header-links-provider';
import PrivateRoute from 'components/private-route';
import { Container, HeaderContainer, HeaderLinks } from 'scenes/app/components';
import Schedule from 'scenes/schedule';
import { header } from 'models/constants';

const renderSchedule = (setHeaderLinks) => (props) => (
  <Schedule {...props} setHeaderLinks={setHeaderLinks} />
);

export const App = ({ isSignedIn, requestSignOut }) => {
  if (!isSignedIn) {
    return <Redirect to="/" />;
  }

  return (
    <HeaderLinksProvider
      initialHeaderLinks={<HeaderLinks requestSignOut={requestSignOut} />}
      render={({ headerLinks, setHeaderLinks }) => (
        <Container>
          <HeaderContainer>
            <Header theme={header.DARK_THEME}>{headerLinks}</Header>
          </HeaderContainer>
          <Switch>
            <PrivateRoute
              exact
              isSignedIn={isSignedIn}
              path="/app/schedule"
              render={renderSchedule(setHeaderLinks)}
            />
          </Switch>
        </Container>
      )}
    />
  );
};

App.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  requestSignOut: PropTypes.func.isRequired,
};

export default (props) => (
  <Consumer
    render={({ isSignedIn, requestSignOut }) => (
      <App isSignedIn={isSignedIn} requestSignOut={requestSignOut} {...props} />
    )}
  />
);
