import * as moment from 'moment-timezone';

import { gql, graphql } from '../../services/graphql/helpers';
import { IScheduleQueryResult } from './types';

export const getUser = (userId: number) => graphql.query<IScheduleQueryResult>({
  query: gql`
    query User($id: ID!) {
      user(id: $id) {
        firstName
        lastName
        company {
          name
          users {
            edges {
              node {
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
      }
    }
  `,
  variables: {
    id: userId,
  },
});

export const toMoment = (time: string) => moment.utc(time, 'YYYY-MM-DD HH-mm-ss UTC').tz(moment.tz.guess());
