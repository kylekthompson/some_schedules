import PropTypes from 'prop-types';
import React from 'react';
import SignInForm from 'apps/sign-in/sign-in-form';
import styled from 'styled-components';
import { Card, Container, Text } from 'components/style';
import { Redirect } from 'react-router-dom';
import { Separator } from 'components/form';
import { authenticated } from 'components/authentication';
import { get } from 'helpers/object';

const StyledContainer = styled(Container)`
  align-items: center;
  padding-top: 100px;
`;

const StyledCard = styled(Card)`
  align-items: center;
`;

export function SignIn({ location, requestSignIn, user }) {
  const from = get(location, 'state.from', '/');

  if (user) {
    return <Redirect to={from} />;
  }

  return (
    <StyledContainer>
      <StyledCard>
        <Text size={20} weight="bold">Sign In</Text>
        <Separator />
        <SignInForm onSuccess={requestSignIn} />
      </StyledCard>
    </StyledContainer>
  );
}

SignIn.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }).isRequired,
  requestSignIn: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default authenticated(SignIn);
