import moment from 'moment-timezone';

import { gql, graphql } from '../../services/graphql/helpers';

export class ScheduleView {
  static WEEK = 'week';
  static DAY = 'day';
}

export const addShiftToState = (state, shift) => {
  const viewer = { ...state.viewer };
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

export const getViewer = (after, before) => graphql.query({
  query: gql`
    query Viewer($after: DateType, $before: DateType) {
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
          shifts(after: $after, before: $before) {
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
  variables: {
    after,
    before,
  },
});

export const toMoment = (time) => moment.utc(time, 'YYYY-MM-DD HH-mm-ss UTC').tz(moment.tz.guess());
