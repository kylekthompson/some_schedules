import Context from 'components/authentication/context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { cache } from 'models/authentication';
import { getMe } from 'apis/me';
import { postSignOut } from 'apis/authentication';

export default class Provider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  handleSignIn = (user) => {
    cache.set(user);
    this.setState({
      user,
    });
  };

  handleSignOut = () => {
    postSignOut();
    cache.clear();
    this.setState({
      user: null,
    });
  };

  state = {
    requestSignIn: this.handleSignIn,
    requestSignOut: this.handleSignOut,
    user: cache.get(),
  };

  componentDidMount() {
    this.getMe();
  }

  getMe = async () => {
    const { me, error } = await getMe();

    if (!error) {
      cache.set(me);
      this.setState({
        user: me,
      });
    } else {
      cache.clear();
      this.setState({
        user: null,
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
