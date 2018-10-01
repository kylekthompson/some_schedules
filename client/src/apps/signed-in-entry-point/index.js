import React from 'react';
import Schedule from 'apps/schedule';
import { Redirect, Route, Switch } from 'react-router-dom';

export default function SignedInEntryPoint() {
  return (
    <Switch>
      <Route component={Schedule} path="/schedule" />
      <Redirect from="/" to="/schedule" />
    </Switch>
  );
}
