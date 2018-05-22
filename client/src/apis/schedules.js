import { get } from 'services/requests';

export function getContext(after, before) {
  return get('/api/schedules/context', {
    after,
    before,
  });
}
