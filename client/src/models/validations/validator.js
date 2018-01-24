export default class Validator {
  constructor(validations) {
    this.validations = validations;
  }

  run(formValues) {
    return this.validations.map((validate) => validate(formValues)).filter(Boolean);
  }
}
