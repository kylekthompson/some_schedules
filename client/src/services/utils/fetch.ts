import { camelizeKeys, decamelizeKeys } from 'humps';

import { IAPIResponse } from '../api/shared/types';
import { getToken } from './authentication';

const getHeaders = () => {
  const headers = new Headers();
  const token = getToken();

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  headers.append('Accept', 'application/json');
  headers.append('Cache-Control', 'no-cache');
  headers.append('Content-Type', 'application/json');
  headers.append('Pragma', 'no-cache');

  return headers;
};

const fetcher = async <T extends {}> (request: Request): Promise<IAPIResponse<T>> => {
  const response = await window.fetch(request);
  const text = await response.text();
  let json = null;

  if (text) {
    json = JSON.parse(text);
  }

  const errors = response.status >= 500
    ? { '': ['An unexpected error has occurred.'] }
    : {};

  const camelizedJSON = json && camelizeKeys(json);

  const result: IAPIResponse<T> = {
    errors,
    status: response.status,
    ...camelizedJSON,
  };

  return result;
};

export const get = <T extends {}> (url): Promise<IAPIResponse<T>> => {
  const request = new Request(url, {
    headers: getHeaders(),
    method: 'GET',
  });

  return fetcher<T>(request);
};

export const post = <T extends {}> (url, body): Promise<IAPIResponse<T>> => {
  const request = new Request(url, {
    body: body && JSON.stringify(decamelizeKeys(body)),
    headers: getHeaders(),
    method: 'POST',
  });

  return fetcher<T>(request);
};
