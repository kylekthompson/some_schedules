import React from 'react';
import SignUpUserForm from 'apps/sign-up/sign-up-user-form';
import { User } from 'spec/support/factories';
import { mount } from 'spec/support/mount';
import { postCreate } from 'apis/users';

jest.mock('apis/users');

describe('<SignUpUserForm />', () => {
  it('properly validates the user fields', () => {
    const onSuccess = jest.fn();
    const { blur, enterValue, getByPlaceholderText, getByText, queryByText } = mount(<SignUpUserForm onSuccess={onSuccess} />);

    enterValue(getByPlaceholderText('First Name'), '');
    blur(getByPlaceholderText('First Name'));

    getByText('Looks like you need 1 more character');

    enterValue(getByPlaceholderText('First Name'), 'First');
    blur(getByPlaceholderText('First Name'));

    expect(queryByText(/Looks like you need \d+ more characters?/)).toBeNull();

    enterValue(getByPlaceholderText('Last Name'), '');
    blur(getByPlaceholderText('Last Name'));

    getByText('Looks like you need 1 more character');

    enterValue(getByPlaceholderText('Last Name'), 'Last');
    blur(getByPlaceholderText('Last Name'));

    expect(queryByText(/Looks like you need \d+ more characters?/)).toBeNull();

    enterValue(getByPlaceholderText('Email'), 'bad-email');
    blur(getByPlaceholderText('Email'));

    getByText('Make sure you\'re using a valid email!');

    enterValue(getByPlaceholderText('Email'), 'good@email.com');
    blur(getByPlaceholderText('Email'));

    expect(queryByText('Make sure you\'re using a valid email!')).toBeNull();

    enterValue(getByPlaceholderText('Password'), 'short');
    blur(getByPlaceholderText('Password'));

    getByText('Looks like you need 3 more characters');

    enterValue(getByPlaceholderText('Password'), 'long-enough');
    blur(getByPlaceholderText('Password'));

    expect(queryByText(/Looks like you need \d+ more characters?/)).toBeNull();

    enterValue(getByPlaceholderText('Password Confirmation'), 'short');
    blur(getByPlaceholderText('Password Confirmation'));

    getByText('Looks like you need 3 more characters');
    getByText('Make sure this matches your password!');

    enterValue(getByPlaceholderText('Password Confirmation'), 'long-enough');
    blur(getByPlaceholderText('Password Confirmation'));

    expect(queryByText(/Looks like you need \d+ more characters?/)).toBeNull();
    expect(queryByText('Make sure this matches your password!')).toBeNull();
  });

  describe('when the sign up is successful', () => {
    it('calls the onSuccess callback and does not show server errors', async () => {
      const onSuccess = jest.fn();
      const { enterValue, click, getByPlaceholderText, getByText, wait } = mount(<SignUpUserForm onSuccess={onSuccess} />);

      const user = new User();
      postCreate.mockImplementationOnce(() => ({
        user,
      }));

      enterValue(getByPlaceholderText('First Name'), 'Kyle');
      enterValue(getByPlaceholderText('Last Name'), 'Thompson');
      enterValue(getByPlaceholderText('Email'), 'some@email.com');
      enterValue(getByPlaceholderText('Password'), 'password');
      enterValue(getByPlaceholderText('Password Confirmation'), 'password');

      click(getByText('Next').parentElement);

      expect(postCreate).toHaveBeenCalledTimes(1);
      expect(postCreate).toHaveBeenCalledWith({
        email: 'some@email.com',
        firstName: 'Kyle',
        lastName: 'Thompson',
        password: 'password',
        passwordConfirmation: 'password',
      });

      await wait(() => expect(onSuccess).toHaveBeenCalledTimes(1));
      expect(onSuccess).toHaveBeenCalledWith(user);
    });
  });

  describe('when the sign in is not successful', () => {
    it('does not call the onSuccess callback and shows the server error', async () => {
      const onSuccess = jest.fn();
      const { enterValue, click, getByPlaceholderText, getByText } = mount(<SignUpUserForm onSuccess={onSuccess} />);

      postCreate.mockImplementationOnce(() => ({
        errors: {
          email: ['has been taken'],
        },
      }));

      enterValue(getByPlaceholderText('First Name'), 'Kyle');
      enterValue(getByPlaceholderText('Last Name'), 'Thompson');
      enterValue(getByPlaceholderText('Email'), 'some@email.com');
      enterValue(getByPlaceholderText('Password'), 'password');
      enterValue(getByPlaceholderText('Password Confirmation'), 'password');

      click(getByText('Next').parentElement);

      expect(postCreate).toHaveBeenCalledTimes(1);
      expect(postCreate).toHaveBeenCalledWith({
        email: 'some@email.com',
        firstName: 'Kyle',
        lastName: 'Thompson',
        password: 'password',
        passwordConfirmation: 'password',
      });

      await Promise.resolve(); // wait a tick for promises to resolve

      expect(onSuccess).toHaveBeenCalledTimes(0);

      getByText('has been taken');
    });
  });
});
