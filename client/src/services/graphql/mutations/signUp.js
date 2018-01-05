import { gql, graphql } from 'services/graphql/helpers';

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
