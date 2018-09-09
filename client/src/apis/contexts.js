import { get } from 'helpers/network';

export function getSchedule(after, before) {
  return get('/api/contexts/schedule', {
    after,
    before,
  });
}
