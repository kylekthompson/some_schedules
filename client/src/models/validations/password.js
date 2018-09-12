import Validation from 'models/validations/validation';
import { atLeastNCharacters } from 'models/validations/shared';

function matches(password, passwordConfirmation) {
  if (password === passwordConfirmation) {
    return null;
  }

  return 'Make sure this matches your password!';
}

export const passwordValidation = new Validation([({ password }) => atLeastNCharacters(password, 8)]);
export const passwordConfirmationValidation = new Validation([
  ({ passwordConfirmation }) => atLeastNCharacters(passwordConfirmation, 8),
  ({ password, passwordConfirmation }) => matches(password, passwordConfirmation),
]);
