import PropTypes from 'prop-types';
import React from 'react';
import Shift from 'components/weekly-schedule/shift';
import {
  Cell,
  NameCell,
  RowContainer,
} from 'components/weekly-schedule/styled-components';
import {
  addDays,
  constants,
  getDate,
  getDayOfWeek,
  getMonth,
} from 'models/time';
import { ofSize } from 'models/array';
import { shiftPropTypes, shiftsForDay } from 'models/shift';
import { userPropTypes } from 'models/user';

export default class Row extends React.Component {
  static propTypes = {
    onCellClick: PropTypes.func.isRequired,
    shifts: PropTypes.arrayOf(shiftPropTypes).isRequired,
    sortShifts: PropTypes.func.isRequired,
    startOfWeek: PropTypes.instanceOf(Date).isRequired,
    user: userPropTypes.isRequired,
  };

  renderNameCell = () => (
    <NameCell>
      <p>{this.props.user.firstName}</p>
      <p>{this.props.user.lastName}</p>
    </NameCell>
  );

  renderWeekdayCells = () =>
    ofSize(constants.DAYS_IN_WEEK)
      .map((day) => addDays(this.props.startOfWeek, day))
      .map(this.renderWeekdayCell);

  renderWeekdayCell = (day) => {
    const { onCellClick, shifts, sortShifts, user } = this.props;

    const shiftsForToday = sortShifts(shiftsForDay(shifts, day));
    return (
      <Cell
        key={`day-${getMonth(day)}-${getDate(day)}`}
        onClick={onCellClick(user.id, day)}
        testId={`user-${user.id}-${getDayOfWeek(day)}`}
      >
        {shiftsForToday.map((shift) => (
          <Shift key={shift.id} shift={shift} />
        ))}
      </Cell>
    );
  };

  render() {
    return (
      <RowContainer>
        {this.renderNameCell()}
        {this.renderWeekdayCells()}
      </RowContainer>
    );
  }
}
