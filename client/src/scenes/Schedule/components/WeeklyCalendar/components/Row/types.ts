import { Moment } from 'moment-timezone';

import { IUser } from '../../../../../../services/graphql/types';

export interface IRowColumnProps {
  previousDay: Moment;
  user: IUser;
}

export interface IRowProps {
  startOfWeek: Moment;
  user: IUser;
}
