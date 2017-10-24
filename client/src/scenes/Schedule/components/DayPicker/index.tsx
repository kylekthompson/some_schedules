import * as React from 'react';

import DayPickerWrapper from './components/DayPickerWrapper';
import Picker from './components/Picker';
import { IDayPickerProps } from './types';

const DayPicker = ({ onClick, onDayPick, selectedDay, visible }: IDayPickerProps) => (
  <DayPickerWrapper>
    <button onClick={onClick}>Calendar</button>
    <Picker
      onDayPick={onDayPick}
      selectedDay={selectedDay}
      visible={visible}
    />
  </DayPickerWrapper>
);

export default DayPicker;
