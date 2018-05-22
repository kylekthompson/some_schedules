import Calendar from 'components/calendar';
import PropTypes from 'prop-types';
import React from 'react';

export default function ScheduleSidebar({ onDayClick, selectedDay }) {
  return <Calendar onDayClick={onDayClick} selectedDay={selectedDay} />;
}

ScheduleSidebar.propTypes = {
  onDayClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Date).isRequired,
};
