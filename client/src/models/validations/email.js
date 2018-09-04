import Validation from 'models/validations/validation';
import { occurenceCount } from 'models/validations/shared';

const EMAIL_REGEX = /^.+@.+\..+$/;

function hasCorrectFormat(email) {
  if (EMAIL_REGEX.exec(email) && occurenceCount(email, '@') === 1) {
    return null;
  }

  return 'Make sure you\'re using a valid email!';
}

export const emailValidation = new Validation([({ email }) => hasCorrectFormat(email)]);
