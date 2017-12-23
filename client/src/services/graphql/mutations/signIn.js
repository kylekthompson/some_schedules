import { gql, graphql, MutationResult } from '../helpers';
import { IErrors } from '../types';

export interface ISignInMutationInput {
  email: string;
  password: string;
}

export interface ISignInMutationResult {
  signIn: {
    errors?: IErrors;
    token?: string;
  };
}

export const signIn = (input: ISignInMutationInput): MutationResult<ISignInMutationResult> => graphql.mutate({
  mutation: gql`
    mutation SignIn($input: SignInInput!) {
      signIn(input: $input) {
        errors
        token
      }
    }
  `,
  variables: { input },
});
