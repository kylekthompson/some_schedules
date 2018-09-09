import { get } from 'helpers/network';

export function getMe() {
  return get('/api/me');
}
