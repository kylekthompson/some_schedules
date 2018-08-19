import buildSharedOptions from 'src/helpers/network/build-shared-options';
import performRequest from 'src/helpers/network/perform-request';
import { decamelizeKeys } from 'humps';

export default function post(url, body = {}) {
  const request = new Request(url, {
    ...buildSharedOptions(),
    body: JSON.stringify(decamelizeKeys(body)),
    method: 'POST',
  });

  return performRequest(request);
}
