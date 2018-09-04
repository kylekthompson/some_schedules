import { post } from 'helpers/network';

export function postCreate(user, shift) {
  return post(`/api/users/${user.id}/shifts`, {
    shift,
  });
}
