import * as React from 'react';

import { Grid } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import Footer from './components/Footer';
import Flashes from './scenes/Flashes';
import Header from './scenes/Header';
import Home from './scenes/Home';
import SignIn from './scenes/SignIn';
import SignUp from './scenes/SignUp';

const App = () => (
  <div>
    <Header />
    <Flashes />
    <Grid>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    </Grid>
    <Footer />
  </div>
);

export default App;
