import Cache from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import HttpLink from 'apollo-link-http';
import SetContextLink from 'apollo-link-set-context';

import { getToken } from './authentication';

const uri = '/api/v1/graphql';
const setContext = (context) => ({
  ...context,
  headers: {
    ...context.headers,
    Authorization: `Bearer ${getToken()}`,
  },
});

const cache = new Cache();
const link = ApolloLink.from([
  new SetContextLink(setContext),
  new HttpLink({ uri }),
]);

export const graphql = new ApolloClient({ cache, link });
