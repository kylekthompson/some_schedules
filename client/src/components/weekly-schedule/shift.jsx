import React from 'react';
import {
  ColoredDot,
  PublishedIcon,
  ShiftContainer,
  ShiftText,
} from 'components/weekly-schedule/styled-components';
import { colors } from 'models/styles';
import { format, toDate } from 'models/time';
import { shiftPropTypes } from 'models/shift';

export default function Shift({ shift }) {
  return (
    <ShiftContainer>
      <ColoredDot color={colors.shakespeareBlue()} />
      <PublishedIcon isPublished={shift.isPublished} />
      <ShiftText>
        {format.forSchedule(toDate(shift.startTime))}
        {' - '}
        {format.forSchedule(toDate(shift.endTime))}
      </ShiftText>
    </ShiftContainer>
  );
}

Shift.propTypes = {
  shift: shiftPropTypes.isRequired,
};
