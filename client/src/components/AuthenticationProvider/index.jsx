import React from 'react';

import PropTypes from 'prop-types';

import { deleteToken, isSignedIn, setToken } from 'models/authentication';

class AuthenticationProvider extends React.Component {
  static propTypes = {
    deleteToken: PropTypes.func.isRequired,
    isSignedIn: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
  };

  static defaultProps = {
    deleteToken,
    isSignedIn,
    setToken,
  };

  state = {
    isSignedIn: this.props.isSignedIn(),
  };

  render() {
    return this.props.render({
      isSignedIn: this.state.isSignedIn,
      requestSignIn: this.handleSignIn,
      requestSignOut: this.handleSignOut,
    });
  }

  handleSignIn = (token) => {
    this.props.setToken(token);
    this.setState({
      isSignedIn: true,
    });
  }

  handleSignOut = (token) => {
    this.props.deleteToken();
    this.setState({
      isSignedIn: false,
    });
  }
}

export default AuthenticationProvider;
