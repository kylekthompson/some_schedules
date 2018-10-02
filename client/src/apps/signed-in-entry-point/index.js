import CompanySettings from 'apps/company-settings';
import NotFound from 'apps/not-found';
import PropTypes from 'prop-types';
import React from 'react';
import Schedule from 'apps/schedule';
import Sidebar from 'apps/signed-in-entry-point/sidebar';
import styled from 'styled-components';
import { Container } from 'components/style';
import { Redirect, Route, Switch } from 'react-router-dom';
import { authenticated } from 'components/authentication';
import { roles } from 'models/user';

const StyledContainer = styled(Container)`
  margin: 0 25px 25px 10px;
`;

export function SignedInEntryPoint({ user, user: { role } }) {
  return (
    <StyledContainer flexDirection="row">
      <Sidebar user={user} />
      <Container>
        <Switch>
          <Route component={Schedule} path="/schedule" />
          {role === roles.OWNER && <Route component={CompanySettings} path="/company-settings" />}
          <Redirect exact={true} from="/" to="/schedule" />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </StyledContainer>
  );
}

SignedInEntryPoint.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.oneOf(Object.values(roles)).isRequired,
  }).isRequired,
};

export default authenticated(SignedInEntryPoint);
