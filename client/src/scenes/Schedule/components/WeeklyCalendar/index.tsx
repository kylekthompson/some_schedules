import * as React from 'react';

import { FlexContainer } from '../../../../components/Flex';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Row from './components/Row';
import Scroller from './components/Scroller';
import { IWeeklyCalendarProps } from './types';

const WeeklyCalendar = ({ onDayPick, selectedDay, users }: IWeeklyCalendarProps) => {
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
        {users.map((user) => <Row key={user.id} startOfWeek={startOfWeek} user={user} />)}
      </Scroller>
    </FlexContainer>
  );
};

export default WeeklyCalendar;
