import { Moment } from 'moment-timezone';

import { IUser } from '../../../../services/graphql/types';

export interface IWeeklyRowProps {
  startOfWeek: Moment;
  user: IUser;
}
