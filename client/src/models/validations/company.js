import Validation from 'models/validations/validation';
import { atLeastNCharacters } from 'models/validations/shared';

export const nameValidation = new Validation([({ name }) => atLeastNCharacters(name, 1)]);
