import { Moment } from 'moment-timezone';

import { IUser } from '../../../../services/graphql/types';

export interface IWeeklyCalendarProps {
  selectedDay: Moment;
  users: IUser[];
}
