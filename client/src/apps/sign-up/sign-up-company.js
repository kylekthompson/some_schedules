import PropTypes from 'prop-types';
import React from 'react';
import SignUpCompanyForm from 'apps/sign-up/sign-up-company-form';
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

export function SignUpCompany({ requestSignIn, user }) {
  return (
    <StyledContainer>
      <StyledCard>
        <Text size={20} weight="bold">Sign Up - Company</Text>
        <Separator />
        <SignUpCompanyForm onSuccess={(company) => requestSignIn({ ...user, company })} />
      </StyledCard>
    </StyledContainer>
  );
}

SignUpCompany.propTypes = {
  requestSignIn: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default authenticated(SignUpCompany);
