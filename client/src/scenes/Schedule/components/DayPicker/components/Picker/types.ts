import { Moment } from 'moment-timezone';

export interface IPickerProps {
  onDayPick: (dayPicked: Moment) => () => void;
  selectedDay: Moment;
  visible: boolean;
}
