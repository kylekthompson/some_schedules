import { gql, graphql } from '../helpers';

export const createShift = (input) => graphql.mutate({
  mutation: gql`
    mutation CreateShift($input: CreateShiftInput!) {
      createShift(input: $input) {
        errors
        shift {
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
  `,
  variables: { input },
});
