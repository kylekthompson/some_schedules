import * as React from 'react';

import { Grid } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './scenes/Header';
import Home from './scenes/Home';
import SignUp from './scenes/SignUp';

const App = () => (
  <div>
    <Header />
    <Grid>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signUp" component={SignUp} />
      </Switch>
    </Grid>
    <Footer />
  </div>
);

export default App;
