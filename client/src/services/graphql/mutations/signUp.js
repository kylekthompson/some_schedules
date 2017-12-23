import { gql, graphql } from '../helpers';

export const signUp = (input) => graphql.mutate({
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
