import * as React from 'react';

import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

import { IPrivateRouteProps } from './types';

class PrivateRoute extends React.Component<IPrivateRouteProps, {}> {
  public render() {
    const { component: Component, isSignedIn, ...rest } = this.props;

    return (
      <Route {...rest} render={this.renderComponentOrRedirect} />
    );
  }

  private renderComponentOrRedirect = (routeProps: RouteComponentProps<any>) => {
    if (this.props.isSignedIn) {
      const { component: Component } = this.props as any;
      return <Component {...routeProps} />;
    }

    return <Redirect to={this.redirectTo('/sign-in', routeProps)} />;
  }

  private redirectTo = (url: string, routeProps: RouteComponentProps<any>) => ({
    pathname: url,
    state: { from: routeProps.location },
  })
}

export default PrivateRoute;
