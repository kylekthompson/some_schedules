import buildSharedOptions from 'src/helpers/network/build-shared-options';
import performRequest from 'src/helpers/network/perform-request';
import { decamelize } from 'humps';

export function buildURL(urlString, params, location = window.location) {
  const url = new URL(urlString.replace(/\/$/, ''), location.origin);

  Object.keys(params).forEach((param) => url.searchParams.set(decamelize(param), params[param]));

  return url;
}

export default function get(url, params = {}) {
  const request = new Request(buildURL(url, params), {
    ...buildSharedOptions(),
    method: 'GET',
  });

  return performRequest(request);
}
