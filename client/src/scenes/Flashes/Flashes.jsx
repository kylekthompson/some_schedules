import React from 'react';

import styled from 'styled-components';

import Flash from './components/Flash';

const SpacedDiv = styled.div`
  margin-top: -20px;
  margin-bottom: 20px;
`;

const Flashes = ({ clearFlash, flashes }) => (
  <SpacedDiv>
    {flashes.map((flash) => <Flash key={flash.uuid} clearFlash={clearFlash} flash={flash} />)}
  </SpacedDiv>
);

export default Flashes;
