import React from 'react';

import moment from 'moment-timezone';
import PropTypes from 'prop-types';

import Calendar from 'components/Calendar';

const Sidebar = ({ onDayPick, selectedDay }) => (
  <Calendar
    onDayPick={onDayPick}
    selectedDay={selectedDay}
  />
);

Sidebar.propTypes = {
  onDayPick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(moment).isRequired,
};

export default Sidebar;
