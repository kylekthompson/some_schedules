import buildSharedOptions from 'helpers/network/build-shared-options';
import performRequest from 'helpers/network/perform-request';
import { decamelizeKeys } from 'humps';

export default function post(url, body = {}) {
  const request = new Request(url, {
    ...buildSharedOptions(),
    body: JSON.stringify(decamelizeKeys(body)),
    method: 'POST',
  });

  return performRequest(request);
}
