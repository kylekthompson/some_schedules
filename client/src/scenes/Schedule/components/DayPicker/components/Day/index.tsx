import * as React from 'react';

import DayWrapper from '../DayWrapper';
import { IDayProps } from './types';

const Day = ({ currentDay, onClick, selectedDay }: IDayProps) => (
  <DayWrapper
    flex="1"
    currentDay={currentDay}
    onClick={onClick}
    selectedDay={selectedDay}
  >
    {currentDay.format('DD')}
  </DayWrapper>
);

export default Day;
