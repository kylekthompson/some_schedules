import * as React from 'react';

import { FlexContainer } from '../../../../../../components/Flex';
import DayPicker from '../../../DayPicker';
import { INavigationProps } from './types';

const Navigation = ({ onDayPick, selectedDay }: INavigationProps) => (
  <FlexContainer
    alignSelf="flex-end"
    flexDirection="row"
  >
    <button onClick={onDayPick(selectedDay.clone().subtract(1, 'week'))}>&lt;</button>
    <DayPicker
      onDayPick={onDayPick}
      selectedDay={selectedDay}
    />
    <button onClick={onDayPick(selectedDay.clone().add(1, 'week'))}>&gt;</button>
  </FlexContainer>
);

export default Navigation;
