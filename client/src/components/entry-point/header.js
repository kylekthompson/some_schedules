import React from 'react';
import styled from 'styled-components';
import { Container, Link, Text } from 'components/style';
import { colors } from 'models/style';

const StyledContainer = styled(Container)`
  align-items: center;
  padding: 10px;
`;

const StyledLink = styled(Link)`
  &:hover {
    & > p {
      transform: translateY(-1px);
      color: ${colors.portlandOrange()};
    }
  }

  &:active {
    & > p {
      transform: translateY(0px);
    }
  }
`;

export default function Header() {
  return (
    <StyledContainer flexDirection="row">
      <Container flex={0}>
        <StyledLink to="/">
          <Text color={colors.rackleyBlue()} size={20} weight="bold">SomeSchedules</Text>
        </StyledLink>
      </Container>
      <Container flex={1} />
      <Container flex="none" flexDirection="row">
        <StyledLink to="/sign-up">
          <Text color={colors.eerieBlack()}>Sign Up</Text>
        </StyledLink>
        <StyledLink to="/sign-in">
          <Text color={colors.eerieBlack()}>Sign In</Text>
        </StyledLink>
      </Container>
    </StyledContainer>
  );
}
