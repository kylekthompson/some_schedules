import * as React from 'react';

import { FlexContainer } from '../../../../components/Flex';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Row from './components/Row';
import Scroller from './components/Scroller';
import { IWeeklyCalendarProps } from './types';

const WeeklyCalendar = ({ selectedDay, users }: IWeeklyCalendarProps) => {
  const startOfWeek = selectedDay.startOf('week');
  return (
    <FlexContainer flexDirection="column">
      <Navigation
        startOfWeek={startOfWeek}
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
