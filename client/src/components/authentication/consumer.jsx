import React from 'react';

import PropTypes from 'prop-types';

import Context from 'components/authentication/context';

const Consumer = ({ render }) => (
  <Context.Consumer>
    {render}
  </Context.Consumer>
);

Consumer.propTypes = {
  render: PropTypes.func.isRequired,
};

export default Consumer;
