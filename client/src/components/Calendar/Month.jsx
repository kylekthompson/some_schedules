import React from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import MonthContainer from 'components/Calendar/MonthContainer';
import MonthDays from 'components/Calendar/MonthDays';
import MonthHeader from 'components/Calendar/MonthHeader';

const Month = ({ currentMonth, onDayClick, onMonthChange, selectedDay }) => (
  <MonthContainer>
    <MonthHeader />
    <MonthDays
      currentMonth={currentMonth}
      onDayClick={onDayClick}
      selectedDay={selectedDay}
    />
  </MonthContainer>
);

Month.propTypes = {
  currentMonth: PropTypes.instanceOf(Moment).isRequired,
  onDayClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Moment).isRequired,
};

export default Month;
