import Validation from 'models/validations/validation';
import { atLeastNCharacters } from 'models/validations/shared';

export const firstNameValidation = new Validation([({ firstName }) => atLeastNCharacters(firstName, 1)]);
export const lastNameValidation = new Validation([({ lastName }) => atLeastNCharacters(lastName, 1)]);
