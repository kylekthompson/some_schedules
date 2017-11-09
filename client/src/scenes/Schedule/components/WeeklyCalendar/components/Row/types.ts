import { Moment } from 'moment-timezone';

import { IShift, IUser } from '../../../../../../services/graphql/types';

export interface IRowProps {
  onAddShift: (userId: number, date: Moment) => (event: React.MouseEvent<HTMLDivElement>) => void;
  shifts: IShift[];
  startOfWeek: Moment;
  user: IUser;
}
