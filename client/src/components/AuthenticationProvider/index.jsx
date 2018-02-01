import React from 'react';

import PropTypes from 'prop-types';

import { signIn, signOut } from 'components/AuthenticationProvider/state/actions';
import createInitialState from 'components/AuthenticationProvider/state/createInitialState';
import reduce from 'components/AuthenticationProvider/state/reduce';

class AuthenticationProvider extends React.Component {
  static propTypes = {
    createInitialState: PropTypes.func,
    reduce: PropTypes.func,
    render: PropTypes.func.isRequired,
    signIn: PropTypes.func,
    signOut: PropTypes.func,
  };

  static defaultProps = {
    createInitialState,
    reduce,
    signIn,
    signOut,
  };

  state = this.props.createInitialState()

  handleSignIn = (token) => this.setState(this.props.reduce(this.props.signIn(token)))
  handleSignOut = () => this.setState(this.props.reduce(this.props.signOut()))

  render() {
    return this.props.render({
      isSignedIn: this.state.isSignedIn,
      requestSignIn: this.handleSignIn,
      requestSignOut: this.handleSignOut,
    });
  }
}

export default AuthenticationProvider;
