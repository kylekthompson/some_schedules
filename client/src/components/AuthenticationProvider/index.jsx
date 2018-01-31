import React from 'react';

import PropTypes from 'prop-types';

import { deleteToken, isSignedIn, setToken } from 'models/authentication';

class AuthenticationProvider extends React.Component {
  static propTypes = {
    deleteToken: PropTypes.func,
    isSignedIn: PropTypes.func,
    render: PropTypes.func.isRequired,
    setToken: PropTypes.func,
  };

  static defaultProps = {
    deleteToken,
    isSignedIn,
    setToken,
  };

  state = {
    isSignedIn: this.props.isSignedIn(),
  };

  handleSignIn = (token) => {
    this.props.setToken(token);
    this.setState({
      isSignedIn: true,
    });
  }

  handleSignOut = () => {
    this.props.deleteToken();
    this.setState({
      isSignedIn: false,
    });
  }

  render() {
    return this.props.render({
      isSignedIn: this.state.isSignedIn,
      requestSignIn: this.handleSignIn,
      requestSignOut: this.handleSignOut,
    });
  }
}

export default AuthenticationProvider;
