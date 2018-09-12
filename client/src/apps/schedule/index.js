import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { authenticated } from 'components/authentication';

function RedirectWithState({ to }) {
  return (
    <Redirect
      to={{
        pathname: to,
        state: { from: '/schedule' },
      }}
    />
  );
}

RedirectWithState.propTypes = {
  to: PropTypes.string.isRequired,
};

export function Schedule({ user }) {
  if (!user) {
    return <RedirectWithState to="/sign-in" />;
  }

  if (user && !user.company) {
    return <RedirectWithState to="/sign-up" />;
  }

  return <p>Schedule</p>;
}

Schedule.propTypes = {
  user: PropTypes.object,
};

export default authenticated(Schedule);
