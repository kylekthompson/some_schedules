import Validation from 'src/models/validations/validation';
import { atLeastNCharacters } from 'src/models/validations/shared';

function matches(password, passwordConfirmation) {
  if (password === passwordConfirmation) {
    return null;
  }

  return 'Make sure this matches your password!';
}

export const passwordValidation = new Validation([({ password }) => atLeastNCharacters(password, 8)]);
export const passwordConfirmationValidation = new Validation([
  ({ password }) => atLeastNCharacters(password, 8),
  ({ password, passwordConfirmation }) => matches(password, passwordConfirmation),
]);
