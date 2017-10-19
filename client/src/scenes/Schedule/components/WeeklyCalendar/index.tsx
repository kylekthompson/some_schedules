import * as React from 'react';

import { FlexContainer } from '../../../../components/Flex';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Row from './components/Row';
import { IWeeklyCalendarProps } from './types';

const WeeklyCalendar = ({ startOfWeek, users }: IWeeklyCalendarProps) => (
  <FlexContainer flexDirection="column">
    <Navigation
      startOfWeek={startOfWeek}
    />
    <Header
      startOfWeek={startOfWeek}
    />
    {users.map((user) => <Row key={user.id} startOfWeek={startOfWeek} user={user} />)}
  </FlexContainer>
);

export default WeeklyCalendar;
