import PropTypes from 'prop-types';
import React from 'react';
import {
  NavigationButton,
  NavigationContainer,
  NavigationText,
} from 'components/calendar/styled-components';
import { addMonths, format, subtractMonths } from 'models/time';

export default function Navigation({ currentMonth, onMonthChange }) {
  return (
    <NavigationContainer>
      <NavigationText>{format.forCalendar(currentMonth)}</NavigationText>
      <NavigationButton
        onClick={() => onMonthChange(subtractMonths(currentMonth, 1))}
      >
        <i className="far fa-xs fa-chevron-left" />
      </NavigationButton>
      <NavigationButton
        onClick={() => onMonthChange(addMonths(currentMonth, 1))}
      >
        <i className="far fa-xs fa-chevron-right" />
      </NavigationButton>
    </NavigationContainer>
  );
}

Navigation.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  onMonthChange: PropTypes.func.isRequired,
};
