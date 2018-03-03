import { decamelizeKeys } from 'humps';

import { fetcher, sharedOptionsFactory } from 'services/requests/helpers';

const buildUrl = (urlString, params) => {
  const url = new URL(urlString.replace(/\/$/, ''));
  Object.keys(params).forEach((param) => url.searchParams.set(decamelizeKeys(param), params[param]));
  return url;
};

const get = (url, params = {}) => {
  const request = new Request(buildUrl(url, params), {
    ...sharedOptionsFactory(),
    method: 'GET',
  });

  return fetcher(request);
};

export default get;
