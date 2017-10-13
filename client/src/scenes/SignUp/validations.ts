const validateEmailFormat = (value: string): string[] => (
  /^.+@.+\..+$/.exec(value)
    ? []
    : ['must be a valid email address.']
);

const validateHasCharacters = (value: string): string[] => (
  value.length > 0
    ? []
    : ['must have at least 1 character.']
);

const validatePasswordFormat = (value: string): string[] => (
  value.length >= 8
    ? []
    : ['must be at least 8 characters.']
);

const validateSlugFormat = (value: string): string[] => (
  /^[\w-]+$/.exec(value)
    ? []
    : ['must contain only letters, numbers, underscores, or hyphens.']
);

export const syncEmailValidation = (value: string): string[] => validateEmailFormat(value);
export const syncFirstNameValidation = (value: string): string[] => validateHasCharacters(value);
export const syncLastNameValidation = (value: string): string[] => validateHasCharacters(value);
export const syncNameValidation = (value: string): string[] => validateHasCharacters(value);
export const syncPasswordComfirmationValidation = (passwordValue: string) => (value: string): string[] => {
  const errors: string[] = [];
  errors.push(...validatePasswordFormat(value));

  if (passwordValue !== value) {
    errors.push('Must match password.');
  }

  return errors;
};
export const syncPasswordValidation = (value: string): string[] => validatePasswordFormat(value);
export const syncSlugValidation = (value: string): string[] => validateSlugFormat(value);