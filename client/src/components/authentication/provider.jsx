import Context from 'components/authentication/context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { propTypes as requestPropTypes, withRequest } from 'components/request';
import { cache } from 'models/authentication-context';
import { compose } from 'models/function';
import { getContext, postSignOut } from 'apis/authentication';

export class Provider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    getContext: requestPropTypes.isRequired,
    postSignOut: requestPropTypes.isRequired,
  };

  componentDidUpdate() {
    if (this.props.getContext.data) {
      this.handleGetContext();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      changed(prevProps, this.props, 'getContext.loading') &&
      !this.props.getContext.loading
    ) {
      this.handleGetContext();
    }
  }

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
    } = await this.props.postSignOut.sendRequest();

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

  handleGetContext = async () => {
    const {
      data: { context, error },
      error: networkError,
    } = await this.props.postSignOut.sendRequest();

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
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default compose(
  withRequest(
    {
      request: getContext,
    },
    'getContext',
  ),
  withRequest(
    {
      request: postSignOut,
      eager: false,
    },
    'postSignOut',
  ),
)(Provider);
