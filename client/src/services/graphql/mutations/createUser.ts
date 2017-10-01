import { graphql, gql, MutationResult } from '../helpers';

export type CreateUserMutationInput = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
};

export type CreateUserMutationResult = {
  createUser: {
    user?: {
      email: string;
      firstName: string;
      lastName: string;
    };
    token?: string;
  };
};

export const createUser = (input: CreateUserMutationInput): MutationResult<CreateUserMutationResult> => graphql.mutate({
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
