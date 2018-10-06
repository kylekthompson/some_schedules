import Header from 'apps/entry-point/components/header';
import Marketing from 'apps/marketing';
import PropTypes from 'prop-types';
import React from 'react';
import SignIn from 'apps/sign-in';
import SignUp from 'apps/sign-up';
import SignedInEntryPoint from 'apps/signed-in-entry-point';
import styled, { injectGlobal } from 'styled-components';
import { Container } from 'components/style';
import { Redirect, Route, Switch } from 'react-router-dom';
import { authenticated } from 'components/authentication';
import { colors } from 'models/style';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');

  html {
    background-color: ${colors.gainsboroWhite()};
  }

  body {
    margin: 0;
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

const StyledContainer = styled(Container)`
  min-height: 100vh;
`;

export function EntryPoint({ user }) {
  return (
    <StyledContainer>
      <Header />
      <Switch>
        <Route component={SignIn} path="/sign-in" />
        <Route component={SignUp} path="/sign-up" />
        {!user && <Route component={Marketing} path="/" />}
        {user && !user.company && <Redirect from="/" to="/sign-up" />}
        {user && user.company && <Route component={SignedInEntryPoint} path="/" />}
      </Switch>
    </StyledContainer>
  );
}

EntryPoint.propTypes = {
  user: PropTypes.shape({
    company: PropTypes.object,
  }),
};

export default authenticated(EntryPoint);
