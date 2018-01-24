const formValuesFromState = ({ form }) => Object.keys(form).reduce((values, field) => ({
  ...values,
  [field]: form[field].value,
}), {});

export default formValuesFromState;
