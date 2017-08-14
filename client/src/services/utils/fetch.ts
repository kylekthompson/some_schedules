import { camelizeKeys, decamelizeKeys } from 'humps';

import { IAPIResponse } from '../api/shared/types';
import { getToken } from './authentication';

const getHeaders = () => {
  const headers = new Headers();
  const token = getToken();

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  return headers;
};

const fetcher = async <T extends {}> (request: Request): Promise<IAPIResponse<T>> => {
  const response = await window.fetch(request);
  const json = await response.json();

  const errors = response.status >= 500
    ? { '': ['An unexpected error has occurred.'] }
    : null;

  const camelizedJSON = json && camelizeKeys(json);

  const result: IAPIResponse<T> = {
    errors,
    status: response.status,
    ...camelizedJSON,
  };

  return result;
};

export const post = <T extends {}> (url, body): Promise<IAPIResponse<T>> => {
  const request = new Request(url, {
    body: body && JSON.stringify(decamelizeKeys(body)),
    cache: 'no-store',
    headers: getHeaders(),
    method: 'POST',
  });

  return fetcher<T>(request);
};
