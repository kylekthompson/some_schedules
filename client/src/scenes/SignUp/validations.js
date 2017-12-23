const validateEmailFormat = (value) => (
  /^.+@.+\..+$/.exec(value)
    ? []
    : ['must be a valid email address.']
);

const validateHasCharacters = (value) => (
  value.length > 0
    ? []
    : ['must have at least 1 character.']
);

const validatePasswordFormat = (value) => (
  value.length >= 8
    ? []
    : ['must be at least 8 characters.']
);

const validateSlugFormat = (value) => (
  /^[\w-]+$/.exec(value)
    ? []
    : ['must contain only letters, numbers, underscores, or hyphens.']
);

export const syncEmailValidation = (value) => validateEmailFormat(value);
export const syncFirstNameValidation = (value) => validateHasCharacters(value);
export const syncLastNameValidation = (value) => validateHasCharacters(value);
export const syncNameValidation = (value) => validateHasCharacters(value);
export const syncPasswordComfirmationValidation = (passwordValue) => (value) => {
  const errors = [];
  errors.push(...validatePasswordFormat(value));

  if (passwordValue !== value) {
    errors.push('Must match password.');
  }

  return errors;
};
export const syncPasswordValidation = (value) => validatePasswordFormat(value);
export const syncSlugValidation = (value) => validateSlugFormat(value);
