import { Moment } from 'moment-timezone';

import { IUser } from '../../services/graphql/types';

export interface IScheduleQueryResult {
  viewer: IUser;
}

export enum ScheduleView {
  DAY = 'day',
  WEEK = 'week',
}

export interface IScheduleState {
  currentView: ScheduleView;
  selectedDay: Moment;
  viewer?: IUser;
}
