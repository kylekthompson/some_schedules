import React from 'react';

import { FlexContainer } from '../../../../components/Flex';

import Header from './components/Header';
import Navigation from './components/Navigation';
import Row from './components/Row';
import Scroller from './components/Scroller';

const shiftsForUser = (shifts, user) => shifts.filter((shift) => shift.user.id === user.id);
const renderUserRow = (
  user,
  shifts,
  onAddShift,
  startOfWeek,
) => (
  <Row
    key={user.id}
    onAddShift={onAddShift}
    startOfWeek={startOfWeek}
    user={user}
    shifts={shiftsForUser(shifts, user)}
  />
);

const WeeklyCalendar = ({ onAddShift, onDayPick, selectedDay, shifts, users }) => {
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
