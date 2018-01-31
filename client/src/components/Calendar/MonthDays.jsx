import React, { Component, Fragment } from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import Day from 'components/Calendar/Day';
import Week from 'components/Calendar/Week';
import { ofSize } from 'models/array';
import { constants } from 'models/time';

class MonthDays extends Component {
  static propTypes = {
    currentMonth: PropTypes.instanceOf(Moment).isRequired,
    onDayClick: PropTypes.func.isRequired,
    selectedDay: PropTypes.instanceOf(Moment).isRequired,
  };

  renderWeeks = () => {
    const iteratingDay = this.props.currentMonth.clone().startOf('month').startOf('week').subtract(1, 'day');
    return ofSize(constants.WEEKS_IN_CALENDAR).map((index) => (
      <Week key={`${this.props.currentMonth.month()}-${index}`}>
        {this.renderDays(iteratingDay)}
      </Week>
    ));
  }

  renderDays = (iteratingDay) => ofSize(constants.DAYS_IN_WEEK).map(() => {
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

  render() {
    return (
      <Fragment>
        {this.renderWeeks()}
      </Fragment>
    );
  }
}

export default MonthDays;
