import Context from 'components/authentication/context';
import PropTypes from 'prop-types';
import React from 'react';

export default function Provider({ children, value }) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    requestSignOut: PropTypes.func.isRequired,
    user: PropTypes.object,
  }).isRequired,
};
