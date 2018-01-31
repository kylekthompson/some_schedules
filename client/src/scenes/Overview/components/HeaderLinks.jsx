import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'components/Header/Link';

const SignedInLinks = () => (
  <Fragment>
    <Link href="/app/schedule" to="/app/schedule">
      Schedule <i className="fal fa-arrow-right" />
    </Link>
  </Fragment>
);

const SignedOutLinks = () => (
  <Fragment>
    <Link href="/sign-in" to="/sign-in">
      Sign In
    </Link>
    <Link href="/sign-up" to="/sign-up">
      Sign Up
    </Link>
  </Fragment>
);

class HeaderLinks extends Component {
  static propTypes = {
    className: PropTypes.string,
    isSignedIn: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  renderLinks() {
    if (this.props.isSignedIn) {
      return <SignedInLinks />;
    }

    return <SignedOutLinks />;
  }

  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        {this.renderLinks()}
      </div>
    );
  }
}

export default styled(HeaderLinks)`
  margin-left: auto;
  font-size: 14px;
`;
