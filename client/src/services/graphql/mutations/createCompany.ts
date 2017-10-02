import { gql, graphql, MutationResult } from '../helpers';

export interface ICreateCompanyMutationInput {
  name: string;
  slug: string;
}

export interface ICreateCompanyMutationResult {
  createCompany: {
    company?: {
      name: string;
      slug: string;
    };
  };
}

export const createCompany = (input: ICreateCompanyMutationInput): MutationResult<ICreateCompanyMutationResult> =>
  graphql.mutate({
    mutation: gql`
      mutation CreateCompany($input: CreateCompanyInput!) {
        createCompany(input: $input) {
          company {
            name
            slug
          }
        }
      }
    `,
    variables: { input },
  });
