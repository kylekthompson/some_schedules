import Header from 'components/entry-point/header';
import Marketing from 'apps/marketing';
import React from 'react';
import Schedule from 'apps/schedule';
import SignIn from 'apps/sign-in';
import SignUp from 'apps/sign-up';
import { Container } from 'components/style';
import { Route, Switch } from 'react-router-dom';
import { colors } from 'models/style';
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

  * {
    box-sizing: border-box;
  }
`;

export default function EntryPoint() {
  return (
    <Container>
      <Header />
      <Switch>
        <Route component={SignIn} path="/sign-in" />
        <Route component={SignUp} path="/sign-up" />
        <Route component={Schedule} path="/schedule" />
        <Route component={Marketing} path="/" />
      </Switch>
    </Container>
  );
}
