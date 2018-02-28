import React from 'react';

import PropTypes from 'prop-types';

import Container from 'components/calendar/container';
import MonthContainer from 'components/calendar/month-container';
import MonthDays from 'components/calendar/month-days';
import MonthHeader from 'components/calendar/month-header';
import Navigation from 'components/calendar/navigation';

class Calender extends React.Component {
  static propTypes = {
    onDayClick: PropTypes.func.isRequired,
    selectedDay: PropTypes.instanceOf(Date).isRequired,
  };

  state = {
    currentMonth: this.props.selectedDay,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedDay !== nextProps.selectedDay) {
      this.setState({
        currentMonth: nextProps.selectedDay,
      });
    }
  }

  onMonthChange = (newMonth) => () => {
    this.setState({
      currentMonth: newMonth,
    });
  }

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

export default Calender;
