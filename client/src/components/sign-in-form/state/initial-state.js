const FORM_FIELDS = ['email', 'password'];

const initialFormState = FORM_FIELDS.reduce((state, field) => ({
  ...state,
  [field]: {
    didBlur: false,
    errors: [],
    isDirty: false,
    value: '',
  },
}), {});

export default {
  form: initialFormState,
};
