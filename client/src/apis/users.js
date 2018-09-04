import { post } from 'helpers/network';

export function postCreate(user) {
  return post('/api/users', {
    user,
  });
}
