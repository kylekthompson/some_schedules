import React from 'react';

import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/lib/Alert';

import { propTypes as flashPropTypes } from 'models/flash';

const Flash = ({ dismissFlash, flash }) => (
  <Alert bsStyle={flash.severity} onDismiss={dismissFlash.bind(null, flash.uuid)}>
    {flash.render()}
  </Alert>
);

Flash.propTypes = {
  dismissFlash: PropTypes.func.isRequired,
  flash: flashPropTypes.isRequired,
};

export default Flash;
