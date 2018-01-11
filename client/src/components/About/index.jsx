import React from 'react';

import styled from 'styled-components';

import { colors } from 'models/constants';

const About = ({ className }) => (
  <p className={className}>
    A description of SomeSchedul.es
  </p>
);

export default styled(About)`
  color: ${colors.white()};
`;
