const TOKEN_KEY = 'AUTHENTICATION/TOKEN';

export const deleteToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const isTokenExpired = (token) => Boolean(token);

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
