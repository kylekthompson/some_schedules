import { get } from 'services/requests';

export const getContext = (after, before) => get('/api/schedules/context', {
  after,
  before,
});
