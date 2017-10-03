import { gql, graphql, MutationResult } from '../helpers';
import { IErrors } from '../types';

export interface ICreateUserMutationInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
}

export interface ICreateUserMutationResult {
  createUser: {
    errors?: IErrors;
    token?: string;
    user?: {
      email: string;
      firstName: string;
      lastName: string;
    };
  };
}

export const createUser = (input: ICreateUserMutationInput): MutationResult<ICreateUserMutationResult> =>
  graphql.mutate({
    mutation: gql`
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          errors
          token
          user {
            email
            firstName
            lastName
          }
        }
      }
    `,
    variables: { input },
  });
