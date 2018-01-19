import React from 'react';

import Moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { propTypes as shiftPropTypes } from 'models/shift';
import { propTypes as userPropTypes } from 'models/user';
import Cell from 'components/WeeklySchedule/Cell';
import Shift from 'components/WeeklySchedule/Shift';
import { sortedShiftsForCurrentDay } from 'components/WeeklySchedule/helpers';
import Week from 'components/WeeklySchedule/Week';

const NameCell = styled.div`
  display: flex;
  flex-direction: column;
  height: 44px;
  justify-content: center;
`;
const NameHolder = styled.p`
  margin: 0;
`;

class Row extends React.Component {
  static propTypes = {
    onAddShift: PropTypes.func.isRequired,
    shifts: PropTypes.arrayOf(shiftPropTypes).isRequired,
    startOfWeek: PropTypes.instanceOf(Moment).isRequired,
    user: userPropTypes.isRequired,
  };

  render() {
    return (
      <Week>
        {this.renderNameCell()}
        {this.renderWeekdayCells()}
      </Week>
    );
  }

  renderNameCell = () => (
    <Cell
      flex="1"
      maxWidth="150px"
      minWidth="150px"
    >
      <NameCell>
        <NameHolder>{this.props.user.firstName}</NameHolder>
        <NameHolder>{this.props.user.lastName}</NameHolder>
      </NameCell>
    </Cell>
  )

  renderWeekdayCells = () => {
    const previousDay = this.props.startOfWeek.clone().subtract(1, 'day');
    return Moment.weekdaysShort().map((weekday) => this.renderWeekdayCell(weekday, previousDay));
  }

  renderWeekdayCell = (weekday, previousDay) => {
    const currentDay = previousDay.add(1, 'day');
    const { onAddShift, shifts, user } = this.props;
    const shiftsForToday = sortedShiftsForCurrentDay(currentDay, shifts);

    return (
      <Cell key={weekday} onClick={onAddShift(user.id, currentDay.clone())}>
        {shiftsForToday.map((shift) => <Shift key={shift.id} shift={shift} />)}
      </Cell>
    );
  }
}

export default Row;
