import constants from 'models/authentication/constants';

const deleteToken = () => localStorage.removeItem(constants.TOKEN_KEY);

export default deleteToken;
