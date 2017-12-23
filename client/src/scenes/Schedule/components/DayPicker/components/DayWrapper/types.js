import { Moment } from 'moment-timezone';

export interface IDayWrapperProps {
  currentMonth: Moment;
  day: Moment;
  selectedDay: Moment;
}
