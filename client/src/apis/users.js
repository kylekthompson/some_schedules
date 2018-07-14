import { post } from 'services/requests';

export function postCreate(user) {
  return post(`/api/users`, {
    user,
  });
}
