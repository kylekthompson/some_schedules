import React from 'react';

import moment from 'moment-timezone';
import PropTypes from 'prop-types';

import DayWrapper from '../DayWrapper';

const Day = ({ currentMonth, day, onClick, selectedDay }) => (
  <DayWrapper
    flex="1"
    currentMonth={currentMonth}
    day={day}
    onClick={onClick}
    selectedDay={selectedDay}
  >
    {day.format('DD')}
  </DayWrapper>
);

Day.propTypes = {
  currentMonth: PropTypes.instanceOf(moment).isRequired,
  day: PropTypes.instanceOf(moment).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(moment).isRequired,
};

export default Day;
