import { formValuesFromState } from 'models/form';

const forceValidation = (validations) => (state) => {
  const newFormState = Object.keys(state.form).reduce((newState, field) => ({
    ...newState,
    [field]: {
      ...newState[field],
      ...state.form[field],
      didBlur: true,
      errors: validations[field].run(formValuesFromState(state)),
      isDirty: true,
    },
  }), {});

  return {
    ...state,
    form: newFormState,
  };
};

export default forceValidation;
