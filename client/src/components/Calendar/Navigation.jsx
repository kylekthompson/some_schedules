import React from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import NavigationButton from 'components/Calendar/NavigationButton';
import NavigationContainer from 'components/Calendar/NavigationContainer';
import NavigationText from 'components/Calendar/NavigationText';
import { format } from 'models/time';

const Navigation = ({ currentMonth, onMonthChange }) => (
  <NavigationContainer>
    <NavigationText>
      {format.forCalendar(currentMonth)}
    </NavigationText>
    <NavigationButton onClick={onMonthChange(currentMonth.clone().subtract(1, 'month'))}>
      <i className="far fa-xs fa-chevron-left" />
    </NavigationButton>
    <NavigationButton onClick={onMonthChange(currentMonth.clone().add(1, 'month'))}>
      <i className="far fa-xs fa-chevron-right" />
    </NavigationButton>
  </NavigationContainer>
);

Navigation.propTypes = {
  currentMonth: PropTypes.instanceOf(Moment).isRequired,
  onMonthChange: PropTypes.func.isRequired,
};

export default Navigation;
