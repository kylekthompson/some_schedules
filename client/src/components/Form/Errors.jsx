import React from 'react';

import styled from 'styled-components';

import { colors } from 'models/constants';
import { fonts } from 'models/styles';

const Icon = ({ className }) => (
  <i className={`fal fa-exclamation-circle ${className}`} />
);

const ErrorIcon = styled(Icon)`
  color: ${colors.stilettoRed()};
  margin-right: 6px;
`;

const ErrorText = styled.p`
  ${fonts.light}
  color: ${colors.white()};
  font-size: 14px;
`;

const Errors = ({ className, errors }) => (
  <div className={className}>
    <ErrorIcon />
    <ErrorText>{errors[0]}</ErrorText>
  </div>
);

export default styled(Errors)`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 4px;
`;
