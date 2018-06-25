import { get } from 'services/requests';

export function getAuthentication() {
  return get('/api/contexts/authentication');
}

export function getSchedule(after, before) {
  return get('/api/contexts/schedule', {
    after,
    before,
  });
}
