import * as React from 'react';

import { Moment } from 'moment-timezone';

import { FlexContainer } from '../../../../components/Flex';
import { IShift, IUser } from '../../../../services/graphql/types';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Row from './components/Row';
import Scroller from './components/Scroller';
import { IWeeklyCalendarProps } from './types';

const shiftsForUser = (shifts: IShift[], user: IUser) => shifts.filter((shift) => shift.user.id === user.id);
const renderUserRow = (
  user: IUser,
  shifts: IShift[],
  onAddShift: (userId: number, date: Moment) => () => void,
  startOfWeek: Moment
) => (
  <Row
    key={user.id}
    onAddShift={onAddShift}
    startOfWeek={startOfWeek}
    user={user}
    shifts={shiftsForUser(shifts, user)}
  />
);

const WeeklyCalendar = ({ onAddShift, onDayPick, selectedDay, shifts, users }: IWeeklyCalendarProps) => {
  const startOfWeek = selectedDay.clone().startOf('week');
  return (
    <FlexContainer flexDirection="column">
      <Navigation
        onDayPick={onDayPick}
        selectedDay={selectedDay}
      />
      <Header
        startOfWeek={startOfWeek}
      />
      <Scroller>
        {users.map((user) => renderUserRow(user, shifts, onAddShift, startOfWeek))}
      </Scroller>
    </FlexContainer>
  );
};

export default WeeklyCalendar;
