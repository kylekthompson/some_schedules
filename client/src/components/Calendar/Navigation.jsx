import React from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import NavigationButton from 'components/Calendar/NavigationButton';
import NavigationContainer from 'components/Calendar/NavigationContainer';
import NavigationText from 'components/Calendar/NavigationText';
import time from 'models/time';

const Navigation = ({ currentMonth, onMonthChange }) => (
  <NavigationContainer>
    <NavigationText>
      {time.formatForCalendar(currentMonth)}
    </NavigationText>
    <NavigationButton onClick={onMonthChange(time.lastMonth(currentMonth))}>
      <i className="far fa-xs fa-chevron-left" />
    </NavigationButton>
    <NavigationButton onClick={onMonthChange(time.nextMonth(currentMonth))}>
      <i className="far fa-xs fa-chevron-right" />
    </NavigationButton>
  </NavigationContainer>
);

Navigation.propTypes = {
  currentMonth: PropTypes.instanceOf(Moment).isRequired,
  onMonthChange: PropTypes.func.isRequired,
};

export default Navigation;
