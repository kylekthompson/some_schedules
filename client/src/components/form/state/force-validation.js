import formValuesFromState from 'components/form/state/form-values-from-state';

export default function forceValidation(validations) {
  return function(state) {
    const newFormState = Object.keys(state.form).reduce(
      (newState, field) => ({
        ...newState,
        [field]: {
          ...newState[field],
          ...state.form[field],
          didBlur: true,
          errors: validations[field].run(formValuesFromState(state)),
          isDirty: true,
        },
      }),
      {},
    );

    return {
      ...state,
      form: newFormState,
    };
  };
}
