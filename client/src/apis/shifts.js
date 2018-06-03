import { post } from 'services/requests';

export function postCreate(user, shift) {
  return post(`/api/users/${user.id}/shifts`, {
    shift,
  });
}
