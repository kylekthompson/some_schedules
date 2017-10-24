import * as React from 'react';

import * as moment from 'moment-timezone';

import { FlexContainer } from '../../../../../../components/Flex';
import Day from '../Day';
import PickerWrapper from '../PickerWrapper';
import { IPickerProps } from './types';

const Picker = ({ currentMonth, onDayPick, onMonthChange, selectedDay, visible }: IPickerProps) => {
  const iteratingDay = currentMonth.clone().startOf('month').startOf('week').subtract(1, 'day');
  const lastDay = currentMonth.clone().endOf('month').endOf('week');

  const weekRows = new Array(lastDay.diff(iteratingDay, 'week')).fill(0).map((_, index) => (
    <FlexContainer key={index} flex="1" flexDirection="row">
      {moment.weekdaysShort().map((weekday) => {
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
      })}
    </FlexContainer>
  ));

  return (
    <PickerWrapper visible={visible}>
      <button onClick={onMonthChange(currentMonth.clone().subtract(1, 'month'))}>&lt;</button>
      {selectedDay.format('MMMM YYYY')}
      <button onClick={onMonthChange(currentMonth.clone().add(1, 'month'))}>&gt;</button>
      <FlexContainer flexDirection="column">
        {weekRows}
      </FlexContainer>
    </PickerWrapper>
  );
};

export default Picker;
