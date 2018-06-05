import Context from 'components/authentication/context';
import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';
import Request from 'components/request';
import { cache } from 'models/authentication-context';
import { getContext, postSignOut } from 'apis/authentication';

export default class Provider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  signOut = createRef();

  handleSignIn = (context) => {
    cache.set(context);
    this.setState({
      ...context,
    });
  };

  handleSignOut = async () => {
    const {
      data: { error },
      error: networkError,
    } = await this.signOut.current.sendRequest();

    if (error || networkError) {
      return;
    }

    cache.clear();
    this.setState({
      isAdmin: false,
      isSignedIn: false,
      role: null,
    });
  };

  state = {
    ...cache.get(),
    requestSignIn: this.handleSignIn,
    requestSignOut: this.handleSignOut,
  };

  handleGetContext = ({ data: { context, error }, error: networkError }) => {
    if (error || networkError) {
      cache.clear();
      this.setState({
        isAdmin: false,
        isSignedIn: false,
        role: null,
      });
    } else {
      cache.set(context);
      this.setState({
        ...context,
      });
    }
  };

  render() {
    return (
      <Request request={getContext} afterRequest={this.handleGetContext}>
        {() => (
          <Request ref={this.signOut} request={postSignOut} eager={false}>
            {() => (
              <Context.Provider value={this.state}>
                {this.props.children}
              </Context.Provider>
            )}
          </Request>
        )}
      </Request>
    );
  }
}
