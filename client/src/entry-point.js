import App from 'scenes/app';
import Overview from 'scenes/overview';
import PrivateRoute from 'components/private-route';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default function EntryPoint() {
  return (
    <Switch>
      <PrivateRoute path="/app" component={App} />
      <Route path="/" component={Overview} />
    </Switch>
  );
}
