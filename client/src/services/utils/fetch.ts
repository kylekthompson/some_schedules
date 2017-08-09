import { camelizeKeys } from 'humps';

import { IAPIResponse } from '../api/types';
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
  const result: IAPIResponse<T> = {
    status: response.status,
    ...camelizeKeys(json),
  };

  return result;
};

export const post = <T extends {}> (url, body): Promise<IAPIResponse<T>> => {
  const request = new Request(url, {
    body: camelizeKeys(body),
    cache: 'no-store',
    headers: getHeaders(),
    method: 'POST',
  });

  return fetcher<T>(request);
};
