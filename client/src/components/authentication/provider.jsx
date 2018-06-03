import Context from 'components/authentication/context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { cache } from 'models/authentication-context';
import { getContext, postSignOut } from 'apis/authentication';

export default class Provider extends Component {
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

  handleSignIn = (context) => {
    this.props.cache.set(context);
    this.setState({
      ...context,
    });
  };

  handleSignOut = () => {
    this.props.postSignOut();
    this.props.cache.clear();
    this.setState({
      isAdmin: false,
      isSignedIn: false,
      role: null,
    });
  };

  state = {
    ...this.props.cache.get(),
    requestSignIn: this.handleSignIn,
    requestSignOut: this.handleSignOut,
  };

  componentDidMount() {
    this.getContext();
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
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
