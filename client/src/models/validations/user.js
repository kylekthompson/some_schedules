import Validator from 'models/validations/validator';
import { hasCharacters } from 'models/validations/shared';

export const firstNameValidator = new Validator([
  ({ firstName }) => hasCharacters(firstName),
]);

export const lastNameValidator = new Validator([
  ({ lastName }) => hasCharacters(lastName),
]);
