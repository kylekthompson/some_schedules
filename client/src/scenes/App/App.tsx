import * as React from 'react';

import { Grid } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from '../../components/Footer';
import PrivateRoute from '../../components/PrivateRoute';
import Companies from '../../scenes/Companies';
import CompanyDashboard from '../../scenes/CompanyDashboard';
import Flashes from '../../scenes/Flashes';
import Header from '../../scenes/Header';
import Home from '../../scenes/Home';
import SignIn from '../../scenes/SignIn';
import SignUp from '../../scenes/SignUp';
import { IAppProps } from './types';

const App = ({ isSignedIn }: IAppProps) => (
  <div>
    <Header />
    <Flashes />
    <Grid>
      <Switch>
        {isSignedIn && <Redirect exact from="/" to="/companies" />}
        <Route exact path="/" component={Home} />
        <PrivateRoute exact isSignedIn={isSignedIn} path="/companies" component={Companies} />
        <PrivateRoute exact isSignedIn={isSignedIn} path="/companies/:slug" component={CompanyDashboard} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    </Grid>
    <Footer />
  </div>
);

export default App;
