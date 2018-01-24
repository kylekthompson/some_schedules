import React, { Component, Fragment } from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import Day from 'components/Calendar/Day';
import Week from 'components/Calendar/Week';
import array from 'models/array';
import time, { DAYS_IN_WEEK, WEEKS_IN_CALENDAR } from 'models/time';

class MonthDays extends Component {
  static propTypes = {
    currentMonth: PropTypes.instanceOf(Moment).isRequired,
    onDayClick: PropTypes.func.isRequired,
    selectedDay: PropTypes.instanceOf(Moment).isRequired,
  };

  render() {
    return (
      <Fragment>
        {this.renderWeeks()}
      </Fragment>
    );
  }

  renderWeeks = () => {
    const iteratingDay = time.firstDayOfMonth(this.props.currentMonth).subtract(1, 'day');
    return array.ofSize(WEEKS_IN_CALENDAR).map((index) => (
      <Week key={`${this.props.currentMonth.month()}-${index}`}>
        {this.renderDays(iteratingDay)}
      </Week>
    ));
  }

  renderDays = (iteratingDay) => array.ofSize(DAYS_IN_WEEK).map((index) => {
    const day = iteratingDay.add(1, 'day').clone();
    return (
      <Day
        key={`${day.month()}-${day.day()}`}
        currentMonth={this.props.currentMonth}
        day={day}
        onClick={this.props.onDayClick(day)}
        selectedDay={this.props.selectedDay}
      />
    );
  })
}

export default MonthDays;
