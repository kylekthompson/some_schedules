import * as decode from 'jwt-decode';

import getToken from 'models/authentication/getToken';

const isSignedIn = () => {
  const token = getToken();
  return Boolean(token) && Date.now() / 1000 < decode(token).exp;
};

export default isSignedIn;
