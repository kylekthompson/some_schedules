import React from 'react';

import PropTypes from 'prop-types';

import NavigationButton from 'components/Calendar/NavigationButton';
import NavigationContainer from 'components/Calendar/NavigationContainer';
import NavigationText from 'components/Calendar/NavigationText';
import { addMonths, format, subtractMonths } from 'models/time';

const Navigation = ({ currentMonth, onMonthChange }) => (
  <NavigationContainer>
    <NavigationText>
      {format.forCalendar(currentMonth)}
    </NavigationText>
    <NavigationButton onClick={onMonthChange(subtractMonths(currentMonth, 1))}>
      <i className="far fa-xs fa-chevron-left" />
    </NavigationButton>
    <NavigationButton onClick={onMonthChange(addMonths(currentMonth, 1))}>
      <i className="far fa-xs fa-chevron-right" />
    </NavigationButton>
  </NavigationContainer>
);

Navigation.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  onMonthChange: PropTypes.func.isRequired,
};

export default Navigation;
