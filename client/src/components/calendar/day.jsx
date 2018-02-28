import React from 'react';

import PropTypes from 'prop-types';

import DayInCurrentMonth from 'components/Calendar/DayInCurrentMonth';
import DayInOtherMonth from 'components/Calendar/DayInOtherMonth';
import Today from 'components/Calendar/Today';
import { format, isSameDay, isSameMonth } from 'models/time';

const Day = ({
  currentMonth,
  day,
  onClick,
  selectedDay,
}) => {
  let DayComponent = DayInCurrentMonth;

  if (isSameDay(day, selectedDay)) {
    DayComponent = Today;
  } else if (!isSameMonth(day, currentMonth)) {
    DayComponent = DayInOtherMonth;
  }

  return (
    <DayComponent onClick={onClick}>
      {format.dateOnly(day)}
    </DayComponent>
  );
};

Day.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  day: PropTypes.instanceOf(Date).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Date).isRequired,
};

export default Day;
