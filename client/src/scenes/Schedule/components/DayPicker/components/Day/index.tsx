import * as React from 'react';

import DayWrapper from '../DayWrapper';
import { IDayProps } from './types';

const Day = ({ currentMonth, day, onClick, selectedDay }: IDayProps) => (
  <DayWrapper
    flex="1"
    currentMonth={currentMonth}
    day={day}
    onClick={onClick}
    selectedDay={selectedDay}
  >
    {day.format('DD')}
  </DayWrapper>
);

export default Day;
