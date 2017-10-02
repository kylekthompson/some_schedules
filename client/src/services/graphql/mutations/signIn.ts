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
    mutation SignIn($input: SignInInput!) {
      signIn(input: $input) {
        token
      }
    }
  `,
  variables: { input },
});
