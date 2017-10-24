import * as React from 'react';

import * as moment from 'moment-timezone';

import Picker from './components/Picker';
import DayPickerWrapper from './components/DayPickerWrapper';
import { IDayPickerProps } from './types';

const DayPicker = ({ onClick, visible }: IDayPickerProps) => (
  <DayPickerWrapper>
    <button onClick={onClick}>Calendar</button>
    <Picker
      selectedDay={moment.tz(moment.tz.guess())}
      visible={visible}
    />
  </DayPickerWrapper>
);

export default DayPicker;
