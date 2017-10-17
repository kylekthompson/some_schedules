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
                firstName
                lastName
                shifts {
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
