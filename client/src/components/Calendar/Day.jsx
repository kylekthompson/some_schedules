import React from 'react';

import moment from 'moment-timezone';
import PropTypes from 'prop-types';

import DayContainer from 'components/Calendar/DayContainer';

const Day = ({ currentMonth, day, onClick, selectedDay }) => (
  <DayContainer
    flex="1"
    currentMonth={currentMonth}
    day={day}
    onClick={onClick}
    selectedDay={selectedDay}
  >
    {day.format('DD')}
  </DayContainer>
);

Day.propTypes = {
  currentMonth: PropTypes.instanceOf(moment).isRequired,
  day: PropTypes.instanceOf(moment).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(moment).isRequired,
};

export default Day;
