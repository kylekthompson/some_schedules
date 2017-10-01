import { graphql, gql, MutationResult } from '../helpers';

export type SignInMutationInput = {
  email: string;
  password: string;
};

export type SignInMutationResult = {
  signIn: {
    token?: string;
  };
};

export const signIn = (input: SignInMutationInput): MutationResult<SignInMutationResult> => graphql.mutate({
  mutation: gql`
    mutation signIn($input: { email: String!, $password: String! }) {
      signIn(input: $input) {
        token
      }
    }
  `,
  variables: { input },
});
