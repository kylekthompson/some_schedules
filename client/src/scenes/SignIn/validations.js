const validateEmailFormat = (value) => (
  /.+@.+\..+/.exec(value)
    ? []
    : ['Must be a valid email address.']
);

const validatePasswordFormat = (value) => (
  value.length >= 8
    ? []
    : ['Must be at least 8 characters.']
);

export const syncEmailValidation = (value) => validateEmailFormat(value);
export const syncPasswordValidation = (value) => validatePasswordFormat(value);
