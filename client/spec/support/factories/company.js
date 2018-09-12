import Factory from 'spec/support/factories/factory';

export default class Company extends Factory {
  constructor(company = {}) {
    super({
      id: Math.floor(Math.random() * 100000000),
      name: 'Company',
      ...company,
    });
  }
}
