import { Moment } from 'moment-timezone';

import { IUser } from '../../../../services/graphql/types';

export interface IWeeklyCalendarProps {
  onDayPick: (dayPicked: Moment) => () => void;
  selectedDay: Moment;
  users: IUser[];
}
