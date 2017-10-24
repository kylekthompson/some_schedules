import * as React from 'react';

import * as moment from 'moment-timezone';

import { FlexContainer } from '../../../../../../components/Flex';
import Day from '../Day';
import PickerWrapper from '../PickerWrapper';
import { IPickerProps } from './types';

const Picker = ({ onDayPick, selectedDay, visible }: IPickerProps) => {
  const iteratingDay = selectedDay.clone().startOf('month').startOf('week').subtract(1, 'day');
  const lastDay = selectedDay.clone().endOf('month').endOf('week');

  const weekRows = new Array(lastDay.diff(iteratingDay, 'week')).fill(0).map((_, index) => (
    <FlexContainer key={index} flex="1" flexDirection="row">
      {moment.weekdaysShort().map((weekday) => {
        const currentDay = iteratingDay.add(1, 'day').clone();

        return (
          <Day
            key={`${index}-${weekday}`}
            currentDay={currentDay}
            onClick={onDayPick(currentDay)}
            selectedDay={selectedDay}
          />
        );
      })}
    </FlexContainer>
  ));

  return (
    <PickerWrapper visible={visible}>
      {selectedDay.format('MMMM YYYY')}
      <FlexContainer flexDirection="column">
        {weekRows}
      </FlexContainer>
    </PickerWrapper>
  );
};

export default Picker;
