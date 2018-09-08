import { post } from 'helpers/network';

export function postSignIn(authentication) {
  return post('/api/authentication/sign_in', {
    authentication,
  });
}

export function postSignOut() {
  return post('/api/authentication/sign_out');
}
