import Validator from 'models/validations/validator';

const EMAIL_REGEX = /^.+@.+\..+$/;

function occurenceCount(string, character) {
  return string.split('').filter((char) => char === character).length;
}

function hasCorrectFormat(email) {
  if (EMAIL_REGEX.exec(email) && occurenceCount(email, '@') === 1) {
    return null;
  }
  return "Make sure you're using a valid email!";
}

export const emailValidator = new Validator([
  ({ email }) => hasCorrectFormat(email),
]);
