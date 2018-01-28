import { pluralize } from 'models/string';
import Validator from 'models/validations/validator';

const matches = (password, passwordConfirmation) => {
  if (password === passwordConfirmation) { return null; }
  return 'Make sure this matches your password!';
};

const atLeastEightCharacters = (password) => {
  if (password.length >= 8) { return null; }
  const missingCount = 8 - password.length;
  return `Looks like you need ${missingCount} more ${pluralize(missingCount, 'character')}`;
};

export const passwordValidator = new Validator([
  ({ password }) => atLeastEightCharacters(password),
]);

export const passwordConfirmationValidator = new Validator([
  ({ password }) => atLeastEightCharacters(password),
  ({ password, passwordConfirmation }) => matches(password, passwordConfirmation),
]);
