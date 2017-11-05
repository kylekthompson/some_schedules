import { Moment } from 'moment-timezone';

import { IShift, IUser } from '../../../../../../services/graphql/types';

export interface IRowProps {
  onAddShift: (userId: number, date: Moment) => () => void;
  shifts: IShift[];
  startOfWeek: Moment;
  user: IUser;
}
