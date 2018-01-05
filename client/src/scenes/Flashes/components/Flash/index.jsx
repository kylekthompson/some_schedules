import React from 'react';

import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/lib/Alert';

import { propTypes as flashPropTypes } from 'models/flash';

const Flash = ({ clearFlash, flash }) => (
  <Alert bsStyle={flash.severity} onDismiss={clearFlash.bind(null, flash.uuid)}>
    {flash.render()}
  </Alert>
);

Flash.propTypes = {
  clearFlash: PropTypes.func.isRequired,
  flash: flashPropTypes.isRequired,
};

export default Flash;
