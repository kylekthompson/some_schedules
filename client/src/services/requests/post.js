import { fetcher, sharedOptionsFactory } from 'services/requests/helpers';

const post = (url, body = {}) => {
  const request = new Request(url, {
    ...sharedOptionsFactory(),
    body: JSON.stringify(body),
    method: 'POST',
  });

  return fetcher(request);
};


export default post;
