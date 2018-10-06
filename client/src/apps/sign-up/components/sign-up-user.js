import PropTypes from 'prop-types';
import React from 'react';
import SignUpUserForm from 'apps/sign-up/components/sign-up-user-form';
import styled from 'styled-components';
import { Card, Container, Text } from 'components/style';
import { Separator } from 'components/form';
import { authenticated } from 'components/authentication';

const StyledContainer = styled(Container)`
  align-items: center;
  padding-top: 100px;
`;

const StyledCard = styled(Card)`
  align-items: center;
`;

export function SignUpUser({ requestSignIn }) {
  return (
    <StyledContainer>
      <StyledCard>
        <Text size={20} weight="bold">Sign Up - User</Text>
        <Separator />
        <SignUpUserForm onSuccess={requestSignIn} />
      </StyledCard>
    </StyledContainer>
  );
}

SignUpUser.propTypes = {
  requestSignIn: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default authenticated(SignUpUser);
