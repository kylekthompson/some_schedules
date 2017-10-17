import { IUser } from '../../services/graphql/types';

export interface IScheduleQueryResult {
  user: IUser;
}

export interface IScheduleProps {
  userId: number;
}

export enum ScheduleView {
  DAY = 'day',
  WEEK = 'week',
}

export interface IScheduleState {
  currentView: ScheduleView;
  user?: IUser;
}
