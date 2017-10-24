import { Moment } from 'moment-timezone';

export interface IDayProps {
  currentMonth: Moment;
  day: Moment;
  onClick: () => void;
  selectedDay: Moment;
}
