import React from 'react';

import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

class PrivateRoute extends React.Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    componentProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    isSignedIn: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    componentProps: {},
  };

  redirectTo = (url, routeProps) => ({
    pathname: url,
    state: { from: routeProps.location },
  })

  renderComponentOrRedirect = (routeProps) => {
    if (this.props.isSignedIn) {
      const { component: Component, componentProps } = this.props;
      return <Component {...routeProps} {...componentProps} />;
    }

    return <Redirect to={this.redirectTo('/sign-in', routeProps)} />;
  }

  render() {
    const {
      component: Component,
      componentProps,
      isSignedIn,
      ...rest
    } = this.props;

    return (
      <Route {...rest} render={this.renderComponentOrRedirect} />
    );
  }
}

export default PrivateRoute;
