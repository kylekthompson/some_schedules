import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'components/Header/Link';

class HeaderLinks extends Component {
  static propTypes = {
    className: PropTypes.string,
    isSignedIn: PropTypes.bool.isRequired,
  };

  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        {this.renderLinks()}
      </div>
    )
  }

  renderLinks() {
    if (this.props.isSignedIn) {
      return this.renderSignedInLinks();
    }

    return this.renderSignedOutLinks();
  }

  renderSignedInLinks() {
    return (
      <Fragment>
        <Link to="/app/schedule">
          Schedule <i className="fal fa-arrow-right" />
        </Link>
      </Fragment>
    )
  }

  renderSignedOutLinks() {
    return (
      <Fragment>
        <Link to="/sign-in">
          Sign In
        </Link>
        <Link to="/sign-up">
          Sign Up
        </Link>
      </Fragment>
    )
  }
}

export default styled(HeaderLinks)`
  margin-left: auto;
  font-size: 14px;
`;
