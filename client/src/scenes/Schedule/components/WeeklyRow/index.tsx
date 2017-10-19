import * as React from 'react';

import * as moment from 'moment-timezone';
import styled from 'styled-components';

import { FlexContainer } from '../../../../components/Flex';
import { IShift, IUser } from '../../../../services/graphql/types';
import { toMoment } from '../../helpers';
import WeeklyCell from '../WeeklyCell';
import WeeklyShift from '../WeeklyShift';
import { IWeeklyRowProps } from './types';

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

const RowColumn = ({ previousDay, user }: { previousDay: moment.Moment, user: IUser }) => {
  const currentDay = previousDay.add(1, 'day');
  const { shifts } = user;

  return (
    <WeeklyCell flex="1">
      {sortedShiftsForCurrentDay(currentDay, shifts).map((shift) => <WeeklyShift key={shift.id} shift={shift} />)}
    </WeeklyCell>
  );
};

const WeeklyRow = ({ startOfWeek, user }: IWeeklyRowProps) => {
  const clonedStartOfWeek = startOfWeek.clone().subtract(1, 'day');

  return (
    <FlexContainer flexDirection="row">
      <WeeklyCell
        isLeftColumn
        flex="0"
        maxWidth="150px"
        minWidth="150px"
      >
        <NameHolder>{user.firstName} {user.lastName}</NameHolder>
      </WeeklyCell>
      {moment.weekdaysShort().map((weekday) => <RowColumn key={weekday} previousDay={clonedStartOfWeek} user={user} />)}
    </FlexContainer>
  );
};

export default WeeklyRow;
