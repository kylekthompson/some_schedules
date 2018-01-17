import constants from 'models/authentication/constants';

const getToken = () => localStorage.getItem(constants.TOKEN_KEY);

export default getToken;
