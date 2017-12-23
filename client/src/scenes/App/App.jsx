import React from 'react';

import { Grid } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from '../../components/Footer';
import PrivateRoute from '../../components/PrivateRoute';
import Flashes from '../../scenes/Flashes';
import Header from '../../scenes/Header';
import Home from '../../scenes/Home';
import Schedule from '../../scenes/Schedule';
import SignIn from '../../scenes/SignIn';
import SignUp from '../../scenes/SignUp';

const App = ({ isSignedIn }) => (
  <div>
    <Header />
    <Flashes />
    <Grid>
      <Switch>
        {isSignedIn && <Redirect exact from="/" to="/schedule" />}
        <Route exact path="/" component={Home} />
        <PrivateRoute exact isSignedIn={isSignedIn} path="/schedule" component={Schedule} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    </Grid>
    <Footer />
  </div>
);

export default App;
