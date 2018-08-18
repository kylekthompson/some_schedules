import Container from 'src/components/entry-point/container';
import Marketing from 'src/apps/marketing';
import React from 'react';
import Schedule from 'src/apps/schedule';
import SignIn from 'src/apps/sign-in';
import SignUp from 'src/apps/sign-up';
import { Router } from '@reach/router';
import { colors } from 'src/models/styles';
import { injectGlobal } from 'styled-components';

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
`;

export default function EntryPoint() {
  return (
    <Container>
      <Router>
        <Marketing path="/" />
        <SignIn path="/sign-in" />
        <SignUp path="/sign-up" />
        <Schedule path="/schedule" />
      </Router>
    </Container>
  );
}
