import { gql, graphql } from '../helpers';

export const signIn = (input) => graphql.mutate({
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
