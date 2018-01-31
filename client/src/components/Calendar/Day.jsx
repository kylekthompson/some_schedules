import React from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import DayInCurrentMonth from 'components/Calendar/DayInCurrentMonth';
import DayInOtherMonth from 'components/Calendar/DayInOtherMonth';
import Today from 'components/Calendar/Today';

const Day = ({
  currentMonth,
  day,
  onClick,
  selectedDay,
}) => {
  let DayComponent = DayInCurrentMonth;

  if (day.isSame(selectedDay, 'day')) {
    DayComponent = Today;
  } else if (!day.isSame(currentMonth, 'month')) {
    DayComponent = DayInOtherMonth;
  }

  return (
    <DayComponent onClick={onClick}>
      {day.format('D')}
    </DayComponent>
  );
};

Day.propTypes = {
  currentMonth: PropTypes.instanceOf(Moment).isRequired,
  day: PropTypes.instanceOf(Moment).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Moment).isRequired,
};

export default Day;
