export default function formValuesFromState({ form }) {
  return Object.keys(form).reduce(
    (values, field) => ({
      ...values,
      [field]: form[field].value,
    }),
    {},
  );
}
