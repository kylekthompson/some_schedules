import PropTypes from 'prop-types';
import React from 'react';
import SignInForm from 'src/apps/sign-in/sign-in-form';
import styled from 'styled-components';
import { Card, Container, Text } from 'src/components/style';
import { Redirect } from 'react-router-dom';
import { Separator } from 'src/components/form';
import { authenticated } from 'src/components/authentication';
import { get } from 'src/helpers/object';

const StyledContainer = styled(Container)`
  align-items: center;
  padding-top: 100px;
`;

const StyledCard = styled(Card)`
  align-items: center;
`;

export function SignIn({ location, isSignedIn }) {
  const from = get(location, 'state.from', '/');

  if (isSignedIn) {
    return <Redirect to={from} />;
  }

  return (
    <StyledContainer>
      <StyledCard>
        <Text size={20} weight="bold">Sign In</Text>
        <Separator />
        <SignInForm />
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
};

export default authenticated(SignIn);
