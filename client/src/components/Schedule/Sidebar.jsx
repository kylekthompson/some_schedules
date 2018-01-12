import React from 'react';

import Moment from 'moment-timezone';
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
  selectedDay: PropTypes.instanceOf(Moment).isRequired,
};

export default Sidebar;
