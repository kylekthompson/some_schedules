import { camelizeKeys } from 'humps';

export function isJSON(headers) {
  const contentTypeHeader = headers.get('Content-Type') || '';
  return contentTypeHeader.includes('application/json');
}

function buildError(status) {
  if (status === 401) {
    return 'Looks like you need to sign in again. Sorry about that! We\'ll redirect you over to the sign in page.';
  } else if (status === 403) {
    return 'Sorry! Looks like you aren\'t allowed to do that...';
  } else if (status >= 400) {
    return 'Looks like something went wrong... Sorry!';
  }

  return null;
}

async function parsedBody(response) {
  const text = await response.text();

  if (!isJSON(response.headers) || !text) {
    return {};
  }

  return camelizeKeys(JSON.parse(text));
}

export default async function performRequest(request, fetch = window.fetch) {
  const response = await fetch(request);

  return {
    error: buildError(response.status),
    status: response.status,
    ...(await parsedBody(response)),
  };
}
