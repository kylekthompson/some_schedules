import constants from 'models/authentication/constants';

const setToken = (token) => localStorage.setItem(constants.TOKEN_KEY, token);

export default setToken;
