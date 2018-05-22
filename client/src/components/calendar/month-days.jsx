import Day from 'components/calendar/day';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Week } from 'components/calendar/styled-components';
import {
  addDays,
  constants,
  getDate,
  getMonth,
  startOfMonth,
  startOfWeek,
} from 'models/time';
import { ofSize } from 'models/array';

export default class MonthDays extends Component {
  static propTypes = {
    currentMonth: PropTypes.instanceOf(Date).isRequired,
    onDayClick: PropTypes.func.isRequired,
    selectedDay: PropTypes.instanceOf(Date).isRequired,
  };

  renderWeeks = () => {
    const firstDayOfFirstWeek = startOfWeek(
      startOfMonth(this.props.currentMonth),
    );
    return ofSize(constants.WEEKS_IN_CALENDAR)
      .map((week) =>
        addDays(firstDayOfFirstWeek, week * constants.DAYS_IN_WEEK),
      )
      .map((firstDayOfWeek) => (
        <Week
          key={`week-${getMonth(this.props.currentMonth)}-${getMonth(
            firstDayOfWeek,
          )}-${getDate(firstDayOfWeek)}`}
        >
          {this.renderDays(firstDayOfWeek)}
        </Week>
      ));
  };

  renderDays = (firstDayOfWeek) =>
    ofSize(constants.DAYS_IN_WEEK)
      .map((day) => addDays(firstDayOfWeek, day))
      .map((day) => (
        <Day
          key={`day-${getMonth(day)}-${getDate(day)}`}
          currentMonth={this.props.currentMonth}
          day={day}
          onClick={this.props.onDayClick(day)}
          selectedDay={this.props.selectedDay}
        />
      ));

  render() {
    return <Fragment>{this.renderWeeks()}</Fragment>;
  }
}
