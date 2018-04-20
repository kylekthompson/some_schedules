import Context from 'components/authentication/context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { cache, constants } from 'models/authentication-context';
import { getContext, postSignOut } from 'apis/authentication';

class Provider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    ...cache.get(),
  };

  componentDidMount() {
    this.getContext();
  }

  get authenticationContext() {
    return {
      isAdmin: this.state.isAdmin,
      isSignedIn: this.state.isSignedIn,
      requestSignIn: this.handleSignIn,
      requestSignOut: this.handleSignOut,
      role: this.state.role,
    };
  }

  getContext = async () => {
    const { context, error } = await getContext();

    if (error) {
      cache.clear();
      this.setState(constants.DEFAULT_CONTEXT);
    } else {
      cache.set(context);
      this.setState(context);
    }
  };

  handleSignIn = (context) => {
    cache.set(context);
    this.setState(context);
  };

  handleSignOut = async () => {
    const { status } = await postSignOut();

    if (status >= 300) {
      throw new Error(
        'We were unable to successfully sign you out. Please try again.',
      );
    }

    cache.clear();
    this.setState(constants.DEFAULT_CONTEXT);
  };

  render() {
    return (
      <Context.Provider value={this.authenticationContext}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
