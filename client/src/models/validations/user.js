import { hasCharacters } from 'models/validations/shared';
import Validator from 'models/validations/validator';

export const firstNameValidator = new Validator([
  ({ firstName }) => hasCharacters(firstName),
]);

export const lastNameValidator = new Validator([
  ({ lastName }) => hasCharacters(lastName),
]);
