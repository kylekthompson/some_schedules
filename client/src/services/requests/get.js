import { decamelizeKeys } from 'humps';

import { fetcher, sharedOptionsFactory } from 'services/requests/helpers';

const buildQueryString = (params) =>
  Object
    .keys(decamelizeKeys(params))
    .reduce((query, param) => `${query}&${param}=${params[param]}`, '')
    .replace('&', '?');

const get = (url, params = {}) => {
  const request = new Request(`${url}${buildQueryString(params)}`, {
    ...sharedOptionsFactory(),
    method: 'GET',
  });

  return fetcher(request);
};

export default get;
