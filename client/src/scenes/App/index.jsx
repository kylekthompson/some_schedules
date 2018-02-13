import React from 'react';

import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router-dom';

import Header from 'components/Header';
import HeaderLinksProvider from 'components/HeaderLinksProvider';
import PrivateRoute from 'components/PrivateRoute';
import { Container, HeaderContainer, HeaderLinks } from 'scenes/App/components';
import Schedule from 'scenes/Schedule';
import { header } from 'models/constants';

const renderSchedule = (setHeaderLinks) => (props) => (
  <Schedule
    {...props}
    setHeaderLinks={setHeaderLinks}
  />
);

const App = ({ isSignedIn, requestSignOut }) => {
  if (!isSignedIn) { return <Redirect to="/" />; }

  return (
    <HeaderLinksProvider
      initialHeaderLinks={<HeaderLinks requestSignOut={requestSignOut} />}
      render={({ headerLinks, setHeaderLinks }) => (
        <Container>
          <HeaderContainer>
            <Header theme={header.DARK_THEME}>
              {headerLinks}
            </Header>
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

export default App;
