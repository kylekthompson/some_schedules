const validateEmailFormat = (value: string): string[] => (
  /.+@.+\..+/.exec(value)
    ? []
    : ['Must be a valid email address.']
);

const validatePasswordFormat = (value: string): string[] => (
  value.length >= 8
    ? []
    : ['Must be at least 8 characters.']
);

export const syncEmailValidation = (value: string): string[] => validateEmailFormat(value);
export const syncPasswordValidation = (value: string): string[] => validatePasswordFormat(value);
