import { Moment } from 'moment-timezone';

export interface IDayProps {
  currentDay: Moment;
  onClick: () => void;
  selectedDay: Moment;
}
