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

export function SignIn({ location, isSignedIn, requestSignIn }) {
  const from = get(location, 'state.from', '/');

  if (isSignedIn) {
    return <Redirect to={from} />;
  }

  return (
    <StyledContainer>
      <StyledCard>
        <Text size={20} weight="bold">Sign In</Text>
        <Separator />
        <SignInForm onSubmit={requestSignIn} />
      </StyledCard>
    </StyledContainer>
  );
}

SignIn.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }).isRequired,
  requestSignIn: PropTypes.func.isRequired,
};

export default authenticated(SignIn);
