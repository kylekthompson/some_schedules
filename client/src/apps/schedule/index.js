import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { authenticated } from 'components/authentication';

export function Schedule({ user }) {
  if (!user) {
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
  user: PropTypes.object,
};

export default authenticated(Schedule);
