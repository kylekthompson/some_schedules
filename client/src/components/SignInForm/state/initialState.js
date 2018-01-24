const FORM_FIELDS = ['password', 'email'];

const initialFormState = FORM_FIELDS.reduce((state, field) => ({
  ...state,
  [field]: {
    didBlur: false,
    errors: [],
    value: '',
  },
}), {});

export default {
  form: initialFormState,
};
