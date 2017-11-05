import * as moment from 'moment-timezone';

import { gql, graphql } from '../../services/graphql/helpers';
import { IScheduleQueryResult } from './types';

export const getViewer = () => graphql.query<IScheduleQueryResult>({
  query: gql`
    query Viewer {
      viewer {
        firstName
        lastName
        company {
          name
          users {
            id
            firstName
            lastName
            shifts {
              id
              endTime
              startTime
              published
            }
          }
        }
      }
    }
  `,
});

export const toMoment = (time: string) => moment.utc(time, 'YYYY-MM-DD HH-mm-ss UTC').tz(moment.tz.guess());
