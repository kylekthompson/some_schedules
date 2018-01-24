import { formValuesFromState } from 'models/form';

const handleInputBlur = (field, validations, event) => {
  const value = event.currentTarget.value;
  return (state) => {
    const errors = validations[field].run({
      ...formValuesFromState(state),
      [field]: value,
    });

    return {
      ...state,
      form: {
        ...state.form,
        [field]: {
          ...state.form[field],
          didBlur: true,
          errors,
          value,
        },
      },
    };
  };
};

export default handleInputBlur;
