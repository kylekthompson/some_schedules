import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Flash from 'components/Flashes/Flash';
import { propTypes as flashPropTypes } from 'models/flash';

const SpacedDiv = styled.div`
  margin-bottom: 20px;
  margin-top: -20px;
`;

const Flashes = ({ dismissFlash, flashes }) => (
  <SpacedDiv>
    {flashes.map((flash) => <Flash key={flash.uuid} dismissFlash={dismissFlash} flash={flash} />)}
  </SpacedDiv>
);

Flashes.propTypes = {
  dismissFlash: PropTypes.func.isRequired,
  flashes: PropTypes.arrayOf(flashPropTypes).isRequired,
};

export default Flashes;
