import PropTypes from 'prop-types';
import React from 'react';
import SignUpCompany from 'apps/sign-up/sign-up-company';
import SignUpUser from 'apps/sign-up/sign-up-user';
import { Redirect, Route, Switch } from 'react-router-dom';
import { authenticated } from 'components/authentication';

export function SignUp({ user }) {
  if (user && user.company) {
    return <Redirect to="/" />;
  }

  return (
    <Switch>
      {!user && <Route component={SignUpUser} path="/sign-up/user" />}
      {user && !user.company && <Route component={SignUpCompany} path="/sign-up/company" />}
      <Redirect from="/sign-up" to={`/sign-up/${user ? 'company' : 'user'}`} />
    </Switch>
  );
}

SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }).isRequired,
  user: PropTypes.object,
};

export default authenticated(SignUp);
