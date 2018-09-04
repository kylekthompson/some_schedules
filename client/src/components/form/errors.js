import React from 'react';
import styled from 'styled-components';
import { Container, Text } from 'components/style';

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
      {errors.map((error) => <Text key={error}>{error}</Text>)}
    </StyledContainer>
  );
}
