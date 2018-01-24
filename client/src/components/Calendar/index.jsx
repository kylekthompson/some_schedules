import React from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import Container from 'components/Calendar/Container';
import Month from 'components/Calendar/Month';
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

  render() {
    const { selectedDay } = this.props;
    const { currentMonth } = this.state;

    return (
      <Container>
        <Navigation
          currentMonth={currentMonth}
          onMonthChange={this.onMonthChange}
        />
        <Month
          currentMonth={currentMonth}
          onDayClick={this.props.onDayClick}
          selectedDay={selectedDay}
        />
      </Container>
    );
  }

  onMonthChange = (newMonth) => () => {
    this.setState({
      currentMonth: newMonth,
    });
  }
}

export default Calender;
