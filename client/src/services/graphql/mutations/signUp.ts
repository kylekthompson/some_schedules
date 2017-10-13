import { gql, graphql, MutationResult } from '../helpers';
import { IErrors } from '../types';

export interface ISignUpMutationInput {
  company: {
    name: string;
    slug: string;
  };
  user: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordConfirmation: string;
  };
}

export interface ISignUpMutationResult {
  signUp: {
    companyErrors?: IErrors;
    errors?: IErrors;
    userErrors?: IErrors;
    token?: string;
  };
}

export const signUp = (input: ISignUpMutationInput): MutationResult<ISignUpMutationResult> => graphql.mutate({
  mutation: gql`
    mutation SignUp($input: SignUpInput!) {
      signUp(input: $input) {
        companyErrors
        errors
        userErrors
        token
      }
    }
  `,
  variables: { input },
});
