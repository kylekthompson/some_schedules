import React from 'react';

import DayWrapper from '../DayWrapper';

const Day = ({ currentMonth, day, onClick, selectedDay }) => (
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
