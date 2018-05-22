import PropTypes from 'prop-types';
import React from 'react';
import {
  ErrorContainer,
  ErrorIcon,
  ErrorText,
} from 'components/form/styled-components';

export default function Errors({ className, errors }) {
  return (
    <ErrorContainer>
      <ErrorIcon />
      <ErrorText>{errors[0]}</ErrorText>
    </ErrorContainer>
  );
}

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};
