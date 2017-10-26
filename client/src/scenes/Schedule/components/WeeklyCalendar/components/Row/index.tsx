import * as React from 'react';

import * as moment from 'moment-timezone';
import styled from 'styled-components';

import { FlexContainer } from '../../../../../../components/Flex';
import { createShift } from '../../../../../../services/graphql/mutations/createShift';
import { IShift } from '../../../../../../services/graphql/types';
import { toMoment } from '../../../../helpers';
import AddShift from '../AddShift';
import Cell from '../Cell';
import Shift from '../Shift';
import { IRowColumnProps, IRowProps } from './types';

const sortedShiftsForCurrentDay = (currentDay: moment.Moment, shifts: IShift[]) => shifts.filter((shift) =>
  currentDay.isSame(toMoment(shift.startTime), 'day')
).sort((a, b) => {
  const aStart = toMoment(a.startTime);
  const aEnd = toMoment(a.endTime);
  const bStart = toMoment(b.startTime);
  const bEnd = toMoment(b.endTime);

  if (aStart.isSame(bStart, 'minute')) {
    if (aEnd.isBefore(bEnd)) {
      return -1;
    } else {
      return 1;
    }
  } else if (aStart.isBefore(bStart, 'minute')) {
    return -1;
  } else {
    return 1;
  }
});

const NameHolder = styled.span`
  padding-top: 6px;
`;

const RowColumn = ({ previousDay, user }: IRowColumnProps) => {
  const currentDay = previousDay.add(1, 'day');
  const { shifts } = user;
  const shiftsForToday = sortedShiftsForCurrentDay(currentDay, shifts);

  if (shiftsForToday.length > 0) {
    return (
      <Cell>
        {shiftsForToday.map((shift) => <Shift key={shift.id} shift={shift} />)}
      </Cell>
    );
  }

  const endTime = currentDay.clone().hours(14).startOf('hour').format();
  const startTime = currentDay.clone().hours(12).startOf('hour').format();

  return (
    <Cell>
      <AddShift
        onClick={() => createShift({
          endTime,
          startTime,
          userId: user.id,
        })}
      />
    </Cell>
  );
};

const Row = ({ startOfWeek, user }: IRowProps) => {
  const clonedStartOfWeek = startOfWeek.clone().subtract(1, 'day');

  return (
    <FlexContainer flexDirection="row">
      <Cell
        isLeftColumn
        flex="0"
        maxWidth="150px"
        minWidth="150px"
      >
        <NameHolder>{user.firstName} {user.lastName}</NameHolder>
      </Cell>
      {moment.weekdaysShort().map((weekday) => <RowColumn key={weekday} previousDay={clonedStartOfWeek} user={user} />)}
    </FlexContainer>
  );
};

export default Row;
