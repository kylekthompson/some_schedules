import PropTypes from 'prop-types';
import React from 'react';
import { DayContainer, DayText } from 'components/calendar/styled-components';
import { format, isSameDay, isSameMonth } from 'models/time';

export default function Day({ currentMonth, day, onClick, selectedDay }) {
  const activeMonth = isSameMonth(day, currentMonth);
  const selected = isSameDay(day, selectedDay);

  return (
    <DayContainer onClick={onClick} selected={selected}>
      <DayText activeMonth={activeMonth} selected={selected}>
        {format.dateOnly(day)}
      </DayText>
    </DayContainer>
  );
}

Day.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  day: PropTypes.instanceOf(Date).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Date).isRequired,
};
