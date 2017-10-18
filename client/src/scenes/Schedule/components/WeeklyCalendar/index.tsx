import * as React from 'react';

import { FlexContainer } from '../../../../components/Flex';
import WeeklyHeader from '../WeeklyHeader';
import WeeklyNavigation from '../WeeklyNavigation';
import WeeklyRow from '../WeeklyRow';
import { IWeeklyCalendarProps } from './types';

const WeeklyCalendar = ({ startOfWeek, users }: IWeeklyCalendarProps) => (
  <FlexContainer flexDirection="column">
    <WeeklyNavigation
      startOfWeek={startOfWeek}
    />
    <WeeklyHeader
      startOfWeek={startOfWeek}
    />
    {users.map((user) => <WeeklyRow key={user.id} startOfWeek={startOfWeek} user={user} />)}
  </FlexContainer>
);

export default WeeklyCalendar;
