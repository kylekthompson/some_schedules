import constants from 'models/authentication-context/constants';

const defaultContext = {
  isAdmin: false,
  isSignedIn: false,
  role: null,
};

function clear() {
  return localStorage.removeItem(constants.AUTHENTICATION_CONTEXT_KEY);
}

function get() {
  const cache = localStorage.getItem(constants.AUTHENTICATION_CONTEXT_KEY);

  if (cache) {
    return JSON.parse(cache);
  }

  return defaultContext;
}

function set(context) {
  return localStorage.setItem(
    constants.AUTHENTICATION_CONTEXT_KEY,
    JSON.stringify(context),
  );
}

export default {
  clear,
  get,
  set,
};
