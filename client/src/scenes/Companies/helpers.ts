import { gql, graphql } from '../../services/graphql/helpers';
import { ICompaniesQueryResult } from './types';

export const getUser = (userId: number) => graphql.query<ICompaniesQueryResult>({
  query: gql`
    query User($id: ID!) {
      user(id: $id) {
        company {
          slug
        }
      }
    }
  `,
  variables: {
    id: userId,
  },
});
