import React from 'react';

import Alert from 'react-bootstrap/lib/Alert';

const Flash = ({ clearFlash, flash }) => (
  <Alert bsStyle={flash.severity} onDismiss={clearFlash.bind(null, flash.uuid)}>
    {flash.render()}
  </Alert>
);

export default Flash;
