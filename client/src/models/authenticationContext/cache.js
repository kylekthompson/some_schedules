import constants from 'models/authenticationContext/constants';

const defaultContext = {
  isAdmin: false,
  isSignedIn: false,
  role: null,
};

const clear = () => localStorage.removeItem(constants.AUTHENTICATION_CONTEXT_KEY);

const get = () => {
  const cache = localStorage.getItem(constants.AUTHENTICATION_CONTEXT_KEY);

  if (cache) {
    return JSON.parse(cache);
  }

  return defaultContext;
};

const set = (context) => localStorage.setItem(constants.AUTHENTICATION_CONTEXT_KEY, JSON.stringify(context));

export default {
  clear,
  get,
  set,
};
