import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { authenticated } from 'src/components/authentication';

export function Schedule({ isSignedIn }) {
  if (!isSignedIn) {
    return (
      <Redirect
        to={{
          pathname: '/sign-in',
          state: { from: '/schedule' },
        }}
      />
    );
  }

  return <p>Schedule</p>;
}

Schedule.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

export default authenticated(Schedule);
