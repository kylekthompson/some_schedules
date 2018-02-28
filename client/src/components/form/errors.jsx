import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from 'models/constants';
import { fonts } from 'models/styles';

const Icon = ({ className }) => (
  <i className={`fal fa-exclamation-circle ${className || ''}`} />
);

Icon.propTypes = {
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

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

Errors.propTypes = {
  className: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Errors.defaultProps = {
  className: '',
};

export default styled(Errors)`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 4px;
`;
