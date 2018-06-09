import Context from 'components/authentication/context';
import React from 'react';

export default function authenticated(Component) {
  function AuthenticatedComponent(props) {
    return (
      <Context.Consumer>
        {(authProps) => <Component {...props} {...authProps} />}
      </Context.Consumer>
    );
  }

  const name = Component.displayName || Component.name || 'Component';
  AuthenticatedComponent.displayName = `authenticated(${name})`;

  return AuthenticatedComponent;
}
