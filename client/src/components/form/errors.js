import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Container, Text } from 'components/style';
import { colors } from 'models/style';

const StyledContainer = styled(Container)`
  align-self: flex-start;
  margin-bottom: 10px;
`;

export default function Errors({ errors }) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <StyledContainer>
      {errors.map((error) => <Text key={error} color={colors.portlandOrange(.8)}>{error}</Text>)}
    </StyledContainer>
  );
}

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};
