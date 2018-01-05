import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { propTypes as flashPropTypes } from 'models/flash';
import Flash from 'scenes/Flashes/components/Flash';

const SpacedDiv = styled.div`
  margin-top: -20px;
  margin-bottom: 20px;
`;

const Flashes = ({ clearFlash, flashes }) => (
  <SpacedDiv>
    {flashes.map((flash) => <Flash key={flash.uuid} clearFlash={clearFlash} flash={flash} />)}
  </SpacedDiv>
);

Flashes.propTypes = {
  clearFlash: PropTypes.func.isRequired,
  flashes: PropTypes.arrayOf(flashPropTypes).isRequired,
};

export default Flashes;
