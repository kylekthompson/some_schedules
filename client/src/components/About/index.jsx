import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from 'models/constants';

const About = ({ className }) => (
  <p className={className}>
    A description of SomeSchedul.es
  </p>
);

About.propTypes = {
  className: PropTypes.string,
};

export default styled(About)`
  color: ${colors.white()};
`;
