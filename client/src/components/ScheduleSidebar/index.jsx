import React from 'react';

import PropTypes from 'prop-types';

import Calendar from 'components/Calendar';

const Sidebar = ({ onDayClick, selectedDay }) => (
  <Calendar
    onDayClick={onDayClick}
    selectedDay={selectedDay}
  />
);

Sidebar.propTypes = {
  onDayClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Date).isRequired,
};

export default Sidebar;
