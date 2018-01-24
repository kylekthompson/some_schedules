import { gql, graphql } from 'services/graphql/helpers';

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
