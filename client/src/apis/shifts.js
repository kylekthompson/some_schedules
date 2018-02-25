import { post } from 'services/requests';

export const postCreate = (user, shift) => post(`/api/users/${user.id}/shifts`, {
  shift,
});
