import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { HeaderLink } from 'components/header/styled-components';
import { HeaderLinksContainer } from 'scenes/overview/styled-components';

function SignedInLinks() {
  return (
    <Fragment>
      <HeaderLink to="/app/schedule">
        Schedule <i className="fal fa-arrow-right" />
      </HeaderLink>
    </Fragment>
  );
}

function SignedOutLinks() {
  return (
    <Fragment>
      <HeaderLink to="/sign-in">Sign In</HeaderLink>
      <HeaderLink to="/sign-up">Sign Up</HeaderLink>
    </Fragment>
  );
}

export default function HeaderLinks({ isSignedIn }) {
  const links = isSignedIn ? <SignedInLinks /> : <SignedOutLinks />;

  return <HeaderLinksContainer>{links}</HeaderLinksContainer>;
}

HeaderLinks.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};
