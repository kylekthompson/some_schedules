import React from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import Container from 'components/Calendar/Container';
import MonthContainer from 'components/Calendar/MonthContainer';
import MonthDays from 'components/Calendar/MonthDays';
import MonthHeader from 'components/Calendar/MonthHeader';
import Navigation from 'components/Calendar/Navigation';

class Calender extends React.Component {
  static propTypes = {
    onDayClick: PropTypes.func.isRequired,
    selectedDay: PropTypes.instanceOf(Moment).isRequired,
  };

  state = {
    currentMonth: this.props.selectedDay.clone(),
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedDay !== nextProps.selectedDay) {
      this.setState({
        currentMonth: nextProps.selectedDay.clone(),
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
