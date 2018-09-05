export default class Validation {
  constructor(validations) {
    this.validations = validations;
  }

  run(object) {
    return this.validations.map((validator) => validator(object)).filter(Boolean);
  }
}
