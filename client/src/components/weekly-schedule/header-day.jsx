import PropTypes from 'prop-types';
import React from 'react';
import {
  DateText,
  HeaderDayContainer,
  WeekdayText,
} from 'components/weekly-schedule/styled-components';
import { format } from 'models/time';

export default function HeaderDay({ day }) {
  return (
    <HeaderDayContainer>
      <WeekdayText>{format.shortWeekdayOnly(day)}</WeekdayText>
      <DateText>{format.dateOnly(day)}</DateText>
    </HeaderDayContainer>
  );
}

HeaderDay.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
};
