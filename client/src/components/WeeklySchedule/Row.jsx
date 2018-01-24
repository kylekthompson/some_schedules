import React from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';

import Cell from 'components/WeeklySchedule/Cell';
import NameCell from 'components/WeeklySchedule/NameCell';
import RowContainer from 'components/WeeklySchedule/RowContainer';
import Shift from 'components/WeeklySchedule/Shift';
import { shiftPropTypes, shiftsForDay } from 'models/shift';
import { userPropTypes } from 'models/user';

class Row extends React.Component {
  static propTypes = {
    onCellClick: PropTypes.func.isRequired,
    shifts: PropTypes.arrayOf(shiftPropTypes).isRequired,
    sortShifts: PropTypes.func.isRequired,
    startOfWeek: PropTypes.instanceOf(Moment).isRequired,
    user: userPropTypes.isRequired,
  };

  render() {
    return (
      <RowContainer>
        {this.renderNameCell()}
        {this.renderWeekdayCells()}
      </RowContainer>
    );
  }

  renderNameCell = () => (
    <NameCell>
      <p>{this.props.user.firstName}</p>
      <p>{this.props.user.lastName}</p>
    </NameCell>
  )

  renderWeekdayCells = () => {
    const previousDay = this.props.startOfWeek.clone().subtract(1, 'day');
    return Moment.weekdaysShort().map((weekday) => this.renderWeekdayCell(weekday, previousDay));
  }

  renderWeekdayCell = (weekday, previousDay) => {
    const currentDay = previousDay.add(1, 'day');
    const { onCellClick, shifts, sortShifts, user } = this.props;
    const shiftsForToday = sortShifts(shiftsForDay(shifts, currentDay));

    return (
      <Cell key={weekday} onClick={onCellClick(user.id, currentDay.clone())}>
        {shiftsForToday.map((shift) => <Shift key={shift.id} shift={shift} />)}
      </Cell>
    );
  }
}

export default Row;
