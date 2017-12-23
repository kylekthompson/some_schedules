import React from 'react';

import moment from 'moment-timezone';

import { FlexChild, FlexContainer } from '../../../../../../components/Flex';
import Day from '../Day';
import PickerWrapper from '../PickerWrapper';

const renderDays = (
  currentMonth,
  index,
  iteratingDay,
  onDayPick,
  selectedDay,
) => moment.weekdaysShort().map((weekday) => {
  const day = iteratingDay.add(1, 'day').clone();
  return (
    <Day
      key={`${index}-${weekday}`}
      currentMonth={currentMonth}
      day={day}
      onClick={onDayPick(day)}
      selectedDay={selectedDay}
    />
  );
});

const renderWeek = (
  currentMonth,
  index,
  iteratingDay,
  onDayPick,
  selectedDay,
) => (
  <FlexContainer key={index} flex="1" flexDirection="row">
    {renderDays(currentMonth, index, iteratingDay, onDayPick, selectedDay)}
  </FlexContainer>
);

const Picker = ({ currentMonth, onDayPick, onMonthChange, selectedDay, visible }) => {
  const iteratingDay = currentMonth.clone().startOf('month').startOf('week').subtract(1, 'day');
  const lastDay = currentMonth.clone().endOf('month').endOf('week');

  const weekRows = new Array(lastDay.diff(iteratingDay, 'week')).fill(0).map((_, index) => renderWeek(
    currentMonth,
    index,
    iteratingDay,
    onDayPick,
    selectedDay
  ));

  weekRows.unshift(
    <FlexContainer key="days" flex="1" flexDirection="row">
      {moment.weekdaysMin().map((weekday) => <FlexChild key={weekday} flex="1">{weekday}</FlexChild>)}
    </FlexContainer>
  );

  return (
    <PickerWrapper visible={visible}>
      <button onClick={onMonthChange(currentMonth.clone().subtract(1, 'month'))}>&lt;</button>
      {currentMonth.format('MMMM YYYY')}
      <button onClick={onMonthChange(currentMonth.clone().add(1, 'month'))}>&gt;</button>
      <FlexContainer flexDirection="column">
        {weekRows}
      </FlexContainer>
    </PickerWrapper>
  );
};

export default Picker;
