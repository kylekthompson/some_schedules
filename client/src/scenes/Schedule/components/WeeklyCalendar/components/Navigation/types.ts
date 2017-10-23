import { Moment } from 'moment-timezone';

export interface INavigationProps {
  startOfWeek: Moment;
}

export interface INavigationState {
  isDayPickerVisible: boolean;
}
