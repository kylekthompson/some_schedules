import { get, post } from 'services/requests';

export function getContext() {
  return get('/api/authentication/context');
}

export function postSignIn(authentication) {
  return post('/api/authentication/sign_in', {
    authentication,
  });
}

export function postSignOut() {
  return post('/api/authentication/sign_out');
}

export function postSignUp(user, company) {
  return post('/api/authentication/sign_up', {
    authentication: {
      user,
      company,
    },
  });
}
