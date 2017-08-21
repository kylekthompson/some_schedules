import * as React from 'react';

import * as Alert from 'react-bootstrap/lib/Alert';

import { IFlashProps } from './types';

const Flash = ({ clearFlash, flash }: IFlashProps) => (
  <Alert bsStyle={flash.severity} onDismiss={clearFlash.bind(null, flash.uuid)}>
    {flash.render()}
  </Alert>
);

export default Flash;
