import React from 'react';

import PropTypes from 'prop-types';

import { deleteToken, isSignedIn, setToken } from 'models/authentication';

class AuthenticationProvider extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
  };

  state = {
    isSignedIn: isSignedIn(),
  };

  render() {
    return this.props.render({
      isSignedIn: this.state.isSignedIn,
      requestSignIn: this.handleSignIn,
      requestSignOut: this.handleSignOut,
    });
  }

  handleSignIn = (token) => {
    setToken(token);
    this.setState({
      isSignedIn: true,
    });
  }

  handleSignOut = (token) => {
    deleteToken();
    this.setState({
      isSignedIn: false,
    });
  }
}

export default AuthenticationProvider;
