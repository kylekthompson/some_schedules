import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { authenticated } from 'src/components/authentication';
import { get } from 'src/helpers/object';

export function SignIn({ location, isSignedIn }) {
  const from = get(location, 'state.from', '/');

  if (isSignedIn) {
    return <Redirect to={from} />;
  }

  return <p>Sign In App</p>;
}

SignIn.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }).isRequired,
};

export default authenticated(SignIn);
