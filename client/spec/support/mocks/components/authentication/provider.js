import Context from 'src/components/authentication/context';
import PropTypes from 'prop-types';
import React from 'react';

export default function Provider({ children, value }) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({
    isSignedIn: PropTypes.bool.isRequired,
    requestSignIn: PropTypes.func.isRequired,
    requestSignOut: PropTypes.func.isRequired,
    role: PropTypes.string,
  }).isRequired,
};
