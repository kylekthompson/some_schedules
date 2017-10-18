import * as React from 'react';

import { FlexChild } from '../../../../components/Flex';
import { toMoment } from '../../helpers';
import { IWeeklyShiftProps } from './types';

const formatTime = (time: string) => toMoment(time).format('h:mm a');

const WeeklyShift = ({ shift }: IWeeklyShiftProps) => (
  <FlexChild>
    <span>{formatTime(shift.startTime)} - {formatTime(shift.endTime)}</span>
  </FlexChild>
);

export default WeeklyShift;
