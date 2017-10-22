import * as React from 'react';

import styled from 'styled-components';

import { ShiftTimeWrapper } from '../Shift';
import { IAddShiftProps } from './types';

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

const AddShift = ({ onClick }: IAddShiftProps) => (
  <HoverWrapper>
    <StyledChild onClick={onClick}>Add a Shift</StyledChild>
  </HoverWrapper>
);

export default AddShift;
