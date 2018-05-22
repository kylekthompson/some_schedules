import Validator from 'models/validations/validator';
import { hasCharacters } from 'models/validations/shared';

const SLUG_REGEX = /^[a-z0-9_-]+$/;

function hasCorrectFormat(email) {
  if (SLUG_REGEX.exec(email)) {
    return null;
  }
  return 'You can only use lowercase letters, numbers, underscores, or hyphens';
}

export const nameValidator = new Validator([({ name }) => hasCharacters(name)]);

export const slugValidator = new Validator([
  ({ slug }) => hasCorrectFormat(slug),
]);
