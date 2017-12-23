import { Moment } from 'moment-timezone';

export interface IPickerProps {
  currentMonth: Moment;
  onDayPick: (dayPicked: Moment) => () => void;
  onMonthChange: (newMonth: Moment) => () => void;
  selectedDay: Moment;
  visible: boolean;
}
