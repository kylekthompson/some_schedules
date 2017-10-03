import Cache from 'apollo-cache-inmemory';
import { ApolloClient, ApolloQueryResult } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import HttpLink from 'apollo-link-http';

import { getToken } from '../utils/authentication';

const uri = '/api/v1/graphql';
const setContext = (context) => {
  const token = getToken();

  if (token) {
    return {
      ...context,
      headers: {
        ...context.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return context;
};

const cache = new Cache();
const link = ApolloLink.from([
  new ApolloLink((operation, forward) => {
    operation.setContext(setContext);
    return (forward as any)(operation);
  }),
  new HttpLink({ uri }),
]);

export type MutationResult<T> = Promise<ApolloQueryResult<T>>;
export type QueryResult<T> = Promise<ApolloQueryResult<T>>;
export const graphql = new ApolloClient({ cache, link });
export { default as gql } from 'graphql-tag';
