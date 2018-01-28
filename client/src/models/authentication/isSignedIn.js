import decode from 'jwt-decode';

import getToken from 'models/authentication/getToken';

const isSignedIn = (now = Date.now() / 1000) => {
  const token = getToken();
  return Boolean(token) && now < decode(token).exp;
};

export default isSignedIn;
