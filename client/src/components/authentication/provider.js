import Context from 'src/components/authentication/context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { cache } from 'src/models/authentication';
import { getAuthentication as getContext } from 'src/apis/contexts';
import { postSignOut } from 'src/apis/authentication';

export default class Provider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  handleSignIn = (context) => {
    cache.set(context);
    this.setState({
      ...context,
    });
  };

  handleSignOut = () => {
    postSignOut();
    cache.clear();
    this.setState({
      isSignedIn: false,
      role: null,
    });
  };

  state = {
    ...cache.get(),
    requestSignIn: this.handleSignIn,
    requestSignOut: this.handleSignOut,
  };

  componentDidMount() {
    this.getContext();
  }

  getContext = async () => {
    const { context, error, errors } = await getContext();

    if (errors || error) {
      cache.clear();
      this.setState({
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
