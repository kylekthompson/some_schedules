import { gql, graphql, MutationResult } from '../helpers';
import { IErrors, IShift } from '../types';

export interface ICreateShiftMutationInput {
  endTime: string;
  startTime: string;
  userId: number;
}

export interface ICreateShiftMutationResult {
  createShift: {
    errors?: IErrors;
    shift?: IShift;
  };
}

export const createShift = (
  input: ICreateShiftMutationInput
): MutationResult<ICreateShiftMutationResult> => graphql.mutate({
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
