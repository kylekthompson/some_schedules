import { Moment } from 'moment-timezone';

export interface IDayPickerProps {
  onDayPick: (dayPicked: Moment) => () => void;
  selectedDay: Moment;
}

export interface IDayPickerState {
  currentMonth: Moment;
  visible: boolean;
}
