import * as React from 'react';

import { Grid } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import { Footer, Header } from './components/Layout';
import Home from './scenes/Home';

const Test = () => <p>test</p>;

const App = () => (
  <div>
    <Header />
    <Grid>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/test" component={Test} />
      </Switch>
    </Grid>
    <Footer />
  </div>
);

export default App;
