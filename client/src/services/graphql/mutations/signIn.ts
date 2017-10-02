import { gql, graphql, MutationResult } from '../helpers';

export interface ISignInMutationInput {
  email: string;
  password: string;
}

export interface ISignInMutationResult {
  signIn: {
    token?: string;
  };
}

export const signIn = (input: ISignInMutationInput): MutationResult<ISignInMutationResult> => graphql.mutate({
  mutation: gql`
    mutation signIn($input: { email: String!, $password: String! }) {
      signIn(input: $input) {
        token
      }
    }
  `,
  variables: { input },
});
