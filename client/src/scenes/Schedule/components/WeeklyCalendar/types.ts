import { Moment } from 'moment-timezone';

import { IShift, IUser } from '../../../../services/graphql/types';

export interface IWeeklyCalendarProps {
  onAddShift: (userId: number, date: Moment) => (event: React.MouseEvent<HTMLDivElement>) => void;
  onDayPick: (dayPicked: Moment) => () => void;
  selectedDay: Moment;
  shifts: IShift[];
  users: IUser[];
}
