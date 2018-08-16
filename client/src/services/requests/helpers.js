import { camelizeKeys } from 'humps';

const getHeaders = () => {
  const headers = new Headers();

  headers.append('Accept', 'application/json');
  headers.append('Cache-Control', 'no-cache');
  headers.append('Content-Type', 'application/json');
  headers.append('Pragma', 'no-cache');

  return headers;
};

export const sharedOptionsFactory = () => ({
  credentials: 'same-origin',
  headers: getHeaders(),
});

const buildError = (status) => {
  if (status === 401) {
    return "Looks like you need to sign in again. Sorry about that! We'll redirect you over to the sign in page.";
  } else if (status >= 400) {
    return 'Looks like something went wrong... Sorry!';
  }

  return null;
};

export const fetcher = async (request) => {
  const response = await window.fetch(request);
  const contentTypeHeader = response.headers.get('Content-Type');
  const isJSON =
    contentTypeHeader && contentTypeHeader.includes('application/json');
  const text = await response.text();

  let json = null;

  if (isJSON && text) {
    json = JSON.parse(text);
  }

  const camelizedJSON = json && camelizeKeys(json);

  const result = {
    status: response.status,
    error: buildError(response.status),
    ...camelizedJSON,
  };

  return result;
};
