import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default class PrivateRoute extends React.Component {
  static propTypes = {
    component: PropTypes.func,
    isSignedIn: PropTypes.bool.isRequired,
    render: PropTypes.func,
  };

  static defaultProps = {
    component: null,
    render: null,
  };

  redirectTo = (url, routeProps) => ({
    pathname: url,
    state: { from: routeProps.location },
  });

  renderComponentOrRedirect = (routeProps) => {
    if (!this.props.isSignedIn) {
      return <Redirect to={this.redirectTo('/sign-in', routeProps)} />;
    }

    const { component: Component, render } = this.props;

    if (Component) {
      return <Component {...routeProps} />;
    }

    return render(routeProps);
  };

  render() {
    const { component: Component, isSignedIn, render, ...rest } = this.props;

    return <Route {...rest} render={this.renderComponentOrRedirect} />;
  }
}
