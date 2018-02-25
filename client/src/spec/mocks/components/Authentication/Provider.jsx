import React from 'react';

import PropTypes from 'prop-types';

import Context from 'components/Authentication/Context';

const Provider = ({ children, value }) => (
  <Context.Provider value={value}>
    {children}
  </Context.Provider>
);

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({
    isAdmin: PropTypes.bool.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    requestSignIn: PropTypes.func.isRequired,
    requestSignOut: PropTypes.func.isRequired,
    role: PropTypes.string,
  }).isRequired,
};

export default Provider;
