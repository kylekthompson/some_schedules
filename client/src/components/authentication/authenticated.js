import Context from 'components/authentication/context';
import React, { Component } from 'react';

export default function authenticated(WrappedComponent) {
  class AuthenticatedComponent extends Component {
    renderComponent = (authentication) => <WrappedComponent {...this.props} {...authentication} />;
    render() {
      return (
        <Context.Consumer>
          {this.renderComponent}
        </Context.Consumer>
      );
    }
  }

  const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  AuthenticatedComponent.displayName = `authenticated(${name})`;

  return AuthenticatedComponent;
}
