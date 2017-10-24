import { Moment } from 'moment-timezone';

export interface IDayPickerProps {
  onClick: () => void;
  onDayPick: (dayPicked: Moment) => () => void;
  selectedDay: Moment;
  visible: boolean;
}
