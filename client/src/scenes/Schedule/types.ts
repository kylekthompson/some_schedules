import { IUser } from '../../services/graphql/types';

export interface IScheduleQueryResult {
  user: IUser;
}

export interface IScheduleProps {
  userId: number;
}

export interface IScheduleState {
  user?: IUser;
}
