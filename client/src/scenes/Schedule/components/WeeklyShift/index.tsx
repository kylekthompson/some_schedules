import * as React from 'react';

import styled, { css } from 'styled-components';

import { FlexChild } from '../../../../components/Flex';
import { toMoment } from '../../helpers';
import { IWeeklyShiftProps } from './types';

const formatTime = (time: string) => {
  const timeMoment = toMoment(time);
  const timeString = timeMoment.minutes() === 0
    ? timeMoment.format('ha')
    : timeMoment.format('h:mma');

    return timeString.replace(/([ap])m/, (substring) => substring.charAt(0));
};

const StyledChild = styled(FlexChild)`
  border-radius: 2px;
  padding: 6px;
  margin-bottom: 4px;

  :last-child {
    margin-bottom: 0;
  }

  ${({ isPublished }: { isPublished: boolean}) => isPublished
    ? css`background-color: #FD4B00; color: white;`
    : css`background-color: lightgrey; color: #333;`
  }
`;

const WeeklyShift = ({ shift }: IWeeklyShiftProps) => (
  <StyledChild isPublished={shift.published}>
    <span>{formatTime(shift.startTime)} - {formatTime(shift.endTime)}</span>
  </StyledChild>
);

export default WeeklyShift;
