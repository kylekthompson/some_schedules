import React from 'react';

import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { propTypes as shiftPropTypes } from 'models/shift';
import { FlexChild } from 'components/Flex';
import time from 'models/time';

const { formatForSchedule, toMoment } = time;

export const ShiftTimeWrapper = styled(FlexChild)`
  border-radius: 2px;
  padding: 6px;
  margin-bottom: 4px;

  :last-child {
    margin-bottom: 0;
  }

  ${({ isPublished }) => isPublished
    ? css`background-color: #FD4B00; color: white;`
    : css`background-color: lightgrey; color: #333;`
  }
`;

ShiftTimeWrapper.propTypes = {
  ...FlexChild.propTypes,
  isPublished: PropTypes.bool,
};

const Shift = ({ shift }) => (
  <ShiftTimeWrapper isPublished={shift.published}>
    <span>
      {formatForSchedule(toMoment(shift.startTime))} - {formatForSchedule(toMoment(shift.endTime))}
    </span>
  </ShiftTimeWrapper>
);

Shift.propTypes = {
  shift: shiftPropTypes.isRequired,
};

export default Shift;
