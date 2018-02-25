import { get, post } from 'services/requests';

export const getContext = () => get('/api/authentication/context');

export const postSignIn = (authentication) => post('/api/authentication/sign_in', {
  authentication,
});

export const postSignOut = () => post('/api/authentication/sign_out');

export const postSignUp = (user, company) => post('/api/authentication/sign_up', {
  authentication: {
    user,
    company,
  },
});
