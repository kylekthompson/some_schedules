import React from 'react';

import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { propTypes as shiftPropTypes } from '../../../../../../models/shift';
import { propTypes as userPropTypes } from '../../../../../../models/user';
import { FlexContainer } from '../../../../../../components/Flex';
import AddShift from '../AddShift';
import Cell from '../Cell';
import Shift from '../Shift';
import { sortedShiftsForCurrentDay } from './helpers';

const NameHolder = styled.span`
  padding-top: 6px;
`;

class Row extends React.Component {
  static propTypes = {
    onAddShift: PropTypes.func.isRequired,
    shifts: PropTypes.arrayOf(shiftPropTypes).isRequired,
    startOfWeek: PropTypes.instanceOf(moment).isRequired,
    user: userPropTypes.isRequired,
  };

  render() {
    return (
      <FlexContainer flexDirection="row">
        {this.renderNameCell()}
        {this.renderWeekdayCells()}
      </FlexContainer>
    );
  }

  renderNameCell = () => (
    <Cell
      isLeftColumn
      flex="0"
      maxWidth="150px"
      minWidth="150px"
    >
      <NameHolder>{this.props.user.firstName} {this.props.user.lastName}</NameHolder>
    </Cell>
  )

  renderWeekdayCells = () => {
    const previousDay = this.props.startOfWeek.clone().subtract(1, 'day');
    return moment.weekdaysShort().map((weekday) => this.renderWeekdayCell(weekday, previousDay));
  }

  renderWeekdayCell = (weekday, previousDay) => {
    const currentDay = previousDay.add(1, 'day');
    const { onAddShift, shifts, user } = this.props;
    const shiftsForToday = sortedShiftsForCurrentDay(currentDay, shifts);

    if (shiftsForToday.length > 0) {
      return (
        <Cell key={weekday}>
          {shiftsForToday.map((shift) => <Shift key={shift.id} shift={shift} />)}
        </Cell>
      );
    }

    return (
      <Cell key={weekday}>
        <AddShift onClick={onAddShift(user.id, currentDay.clone())} />
      </Cell>
    );
  }
}

export default Row;
