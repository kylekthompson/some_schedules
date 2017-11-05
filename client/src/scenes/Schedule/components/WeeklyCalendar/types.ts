import { Moment } from 'moment-timezone';

import { IShift, IUser } from '../../../../services/graphql/types';

export interface IWeeklyCalendarProps {
  onAddShift: (userId: number, date: Moment) => () => void;
  onDayPick: (dayPicked: Moment) => () => void;
  selectedDay: Moment;
  shifts: IShift[];
  users: IUser[];
}
