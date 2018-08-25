import React from 'react';
import { Container, Link, Text } from 'src/components/style';
import { colors } from 'src/models/style';
import { css } from 'styled-components';

export default function Header() {
  return (
    <Container flexDirection="row" overrides={styles.container}>
      <Container flex={0}>
        <Link overrides={styles.link} to="/">
          <Text color={colors.rackleyBlue()} size={20} weight="bold">SomeSchedules</Text>
        </Link>
      </Container>
      <Container flex={1} />
      <Container flex="none" flexDirection="row">
        <Link overrides={styles.link} to="/sign-up">
          <Text color={colors.eerieBlack()}>Sign Up</Text>
        </Link>
        <Link overrides={styles.link} to="/sign-in">
          <Text color={colors.eerieBlack()}>Sign In</Text>
        </Link>
      </Container>
    </Container>
  );
}

const styles = {
  container: css`
    align-items: center;
    padding: 10px;
  `,
  link: css`
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
  `,
};
