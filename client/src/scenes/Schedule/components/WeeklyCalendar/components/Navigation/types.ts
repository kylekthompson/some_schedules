import { Moment } from 'moment-timezone';

export interface INavigationProps {
  onDayPick: (dayPicked: Moment) => () => void;
  selectedDay: Moment;
}

export interface INavigationState {
  isDayPickerVisible: boolean;
}
