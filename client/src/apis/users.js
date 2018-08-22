import { post } from 'src/helpers/network';

export function postCreate(user) {
  return post('/api/users', {
    user,
  });
}
