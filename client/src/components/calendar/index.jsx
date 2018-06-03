import MonthDays from 'components/calendar/month-days';
import MonthHeader from 'components/calendar/month-header';
import Navigation from 'components/calendar/navigation';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Container,
  MonthContainer,
} from 'components/calendar/styled-components';
import { isSameDay } from 'models/time';

export default class Calender extends React.Component {
  static propTypes = {
    onDayClick: PropTypes.func.isRequired,
    selectedDay: PropTypes.instanceOf(Date).isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (isSameDay(prevState.currentMonth, nextProps.selectedDay)) {
      return null;
    }

    return {
      currentMonth: nextProps.selectedDay,
    };
  }

  state = {
    currentMonth: this.props.selectedDay,
  };

  onMonthChange = (newMonth) => {
    this.setState({
      currentMonth: newMonth,
    });
  };

  render() {
    const { onDayClick, selectedDay } = this.props;
    const { currentMonth } = this.state;

    return (
      <Container>
        <Navigation
          currentMonth={currentMonth}
          onMonthChange={this.onMonthChange}
        />
        <MonthContainer>
          <MonthHeader />
          <MonthDays
            currentMonth={currentMonth}
            onDayClick={onDayClick}
            selectedDay={selectedDay}
          />
        </MonthContainer>
      </Container>
    );
  }
}
