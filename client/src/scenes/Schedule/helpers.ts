import * as moment from 'moment-timezone';

import { gql, graphql } from '../../services/graphql/helpers';
import { IShift, IUser } from '../../services/graphql/types';
import { IScheduleQueryResult, IScheduleState } from './types';

export const addShiftToState = (state: IScheduleState, shift: IShift) => {
  const viewer = { ...(state.viewer as IUser) };
  return {
    ...state,
    viewer: {
      ...viewer,
      company: {
        ...viewer.company,
        shifts: [
          ...viewer.company.shifts,
          shift,
        ],
      },
    },
  };
};

export const getViewer = () => graphql.query<IScheduleQueryResult>({
  query: gql`
    query Viewer {
      viewer {
        id
        firstName
        lastName
        company {
          id
          name
          users {
            id
            firstName
            lastName
          }
          shifts {
            id
            endTime
            startTime
            published
            user {
              id
            }
          }
        }
      }
    }
  `,
});
export const toMoment = (time: string) => moment.utc(time, 'YYYY-MM-DD HH-mm-ss UTC').tz(moment.tz.guess());
