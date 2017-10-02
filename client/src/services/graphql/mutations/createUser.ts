import { gql, graphql, MutationResult } from '../helpers';

export interface ICreateUserMutationInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
}

export interface ICreateUserMutationResult {
  createUser: {
    user?: {
      email: string;
      firstName: string;
      lastName: string;
    };
    token?: string;
  };
}

export const createUser = (input: ICreateUserMutationInput): MutationResult<ICreateUserMutationResult> =>
  graphql.mutate({
    mutation: gql`
      mutation createUser($input: {
        email: String!,
        firstName: String!,
        lastName: String!,
        password: String!,
        passwordConfirmation: String!
      }) {
        createUser(input: $input) {
          user {
            email
            firstName
            lastName
          }
          token
        }
      }
    `,
    variables: { input },
  });
