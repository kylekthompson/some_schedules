const TOKEN_KEY = 'AUTHENTICATION/TOKEN';

export const deleteToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const isTokenExpired = (token: string): boolean => Boolean(token);

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};
