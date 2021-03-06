import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Container, Link, Text } from 'components/style';
import { authenticated } from 'components/authentication';
import { colors } from 'models/style';

const StyledContainer = styled(Container)`
  align-items: center;
  padding: 10px;
`;

const StyledLink = styled(Link)`
  &:hover {
    & > p {
      color: ${colors.portlandOrange()};
    }
  }
`;

export function Header({ requestSignOut, user }) {
  return (
    <StyledContainer flexDirection="row">
      <Container flex={0}>
        <StyledLink to="/">
          <Text color={colors.rackleyBlue()} size={20} weight="bold">SomeSchedules</Text>
        </StyledLink>
      </Container>
      <Container flex={1} />
      <Container flex="none" flexDirection="row">
        {!user && (
          <>
            <StyledLink to="/sign-up">
              <Text color={colors.eerieBlack()}>Sign Up</Text>
            </StyledLink>
            <StyledLink to="/sign-in">
              <Text color={colors.eerieBlack()}>Sign In</Text>
            </StyledLink>
          </>
        )}
        {user && (
          <>
            {!user.company && (
              <StyledLink to="/sign-up">
                <Text color={colors.eerieBlack()}>Finish Sign Up</Text>
              </StyledLink>
            )}
            <StyledLink onClick={requestSignOut} to="/">
              <Text color={colors.eerieBlack()}>Sign Out</Text>
            </StyledLink>
          </>
        )}
      </Container>
    </StyledContainer>
  );
}

Header.propTypes = {
  requestSignOut: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default authenticated(Header);
