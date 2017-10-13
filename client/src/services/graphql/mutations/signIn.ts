import { gql, graphql, MutationResult } from '../helpers';
import { IErrors, IUser } from '../types';

export interface ISignInMutationInput {
  email: string;
  password: string;
}

export interface ISignInMutationResult {
  signIn: {
    errors?: IErrors;
    token?: string;
    user?: IUser;
  };
}

export const signIn = (input: ISignInMutationInput): MutationResult<ISignInMutationResult> => graphql.mutate({
  mutation: gql`
    mutation SignIn($input: SignInInput!) {
      signIn(input: $input) {
        errors
        token
        user {
          company {
            slug
          }
        }
      }
    }
  `,
  variables: { input },
});
