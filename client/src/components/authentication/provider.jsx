import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { getContext, postSignOut } from 'apis/authentication';
import Context from 'components/authentication/context';
import { cache } from 'models/authentication-context';

class Provider extends Component {
  static propTypes = {
    cache: PropTypes.shape({
      clear: PropTypes.func.isRequired,
      get: PropTypes.func.isRequired,
      set: PropTypes.func.isRequired,
    }),
    children: PropTypes.node.isRequired,
    getContext: PropTypes.func,
    postSignOut: PropTypes.func,
  };

  static defaultProps = {
    cache,
    getContext,
    postSignOut,
  };

  state = {
    ...this.props.cache.get(),
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
    const { context, error } = await this.props.getContext();

    if (error) {
      this.props.cache.clear();
      this.setState({
        isAdmin: false,
        isSignedIn: false,
        role: null,
      });
    } else {
      this.props.cache.set(context);
      this.setState({
        ...context,
      });
    }
  }

  handleSignIn = (context) => {
    this.props.cache.set(context);
    this.setState({
      ...context,
    });
  }

  handleSignOut = () => {
    this.props.postSignOut();
    this.props.cache.clear();
    this.setState({
      isAdmin: false,
      isSignedIn: false,
      role: null,
    });
  }

  render() {
    return (
      <Context.Provider value={this.authenticationContext}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Provider;
