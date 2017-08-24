import * as React from 'react';

import { Grid } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';

import FailureRoute from '../../components/FailureRoute';
import Footer from '../../components/Footer';
import LoadingRoute from '../../components/LoadingRoute';
import PrivateRoute from '../../components/PrivateRoute';
import Companies from '../../scenes/Companies';
import Flashes from '../../scenes/Flashes';
import Header from '../../scenes/Header';
import Home from '../../scenes/Home';
import SignIn from '../../scenes/SignIn';
import SignUp from '../../scenes/SignUp';
import { IAppProps } from './types';

class App extends React.PureComponent<IAppProps, {}> {
  public componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.requestUserById(this.props.signedInUserId);
    }
  }

  public componentWillReceiveProps(nextProps: IAppProps) {
    if (!this.props.isSignedIn && nextProps.isSignedIn) {
      this.props.requestUserById(nextProps.signedInUserId);
    }
  }

  public render() {
    const { isSignedIn, requestUserByIdLoadingState } = this.props;

    return (
      <div>
        <Header />
        <Flashes />
        <Grid>
          <Switch>
            {requestUserByIdLoadingState.isLoading() && <LoadingRoute message="Loading your profile..." />}
            {requestUserByIdLoadingState.isFailure() && <FailureRoute errors={requestUserByIdLoadingState.errors()} />}
            {isSignedIn && <Redirect exact from="/" to="/companies" />}
            <Route exact path="/" component={Home} />
            <PrivateRoute isSignedIn={isSignedIn} path="/companies/:slug?" component={Companies} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
          </Switch>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default App;
