import formValuesFromState from 'models/form/formValuesFromState';

describe('formValuesFromState()', () => {
  it('gets the correct values', () => {
    const state = {
      form: {
        email: {
          some: 'value',
          other: 'thing',
          value: 'email',
        },
        password: {
          some: 'value',
          other: 'thing',
          value: 'password',
        },
      },
    };

    expect(formValuesFromState(state)).toEqual({
      email: 'email',
      password: 'password',
    });
  });
});
