import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ShiftTimeWrapper } from '../Shift';

const HoverWrapper = styled.span`
  & * {
    visibility: hidden;
  }

  &:hover * {
    visibility: visible;
  }
`;

const StyledChild = styled(ShiftTimeWrapper)`
  cursor: pointer;
  text-align: center;
`;

const AddShift = ({ onClick }) => (
  <HoverWrapper>
    <StyledChild onClick={onClick}>Add a Shift</StyledChild>
  </HoverWrapper>
);

AddShift.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddShift;
