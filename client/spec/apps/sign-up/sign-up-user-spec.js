import React from 'react';
import { SignUpUser } from 'apps/sign-up/sign-up-user';
import { User } from 'spec/support/factories';
import { mount } from 'spec/support/mount';
import { postCreate } from 'apis/users';

jest.mock('apis/users');

describe('<SignUpUser />', () => {
  describe('when the sign up is successful', () => {
    it('handles the sign up', async () => {
      const requestSignIn = jest.fn();
      const { enterValue, click, getByPlaceholderText, getByText, wait } = mount(<SignUpUser requestSignIn={requestSignIn} />);

      const user = new User();
      postCreate.mockImplementationOnce(() => ({ user }));

      enterValue(getByPlaceholderText('First Name'), 'Kyle');
      enterValue(getByPlaceholderText('Last Name'), 'Thompson');
      enterValue(getByPlaceholderText('Email'), 'email@example.com');
      enterValue(getByPlaceholderText('Password'), 'password');
      enterValue(getByPlaceholderText('Password Confirmation'), 'password');

      click(getByText('Next').parentElement);

      expect(postCreate).toHaveBeenCalledTimes(1);
      expect(postCreate).toHaveBeenCalledWith({
        email: 'email@example.com',
        firstName: 'Kyle',
        lastName: 'Thompson',
        password: 'password',
        passwordConfirmation: 'password',
      });

      await wait(() => expect(requestSignIn).toHaveBeenCalledTimes(1));
      expect(requestSignIn).toHaveBeenCalledWith(user);
    });
  });

  describe('when the sign up is not successful', () => {
    it('does not handle the sign up', async () => {
      const requestSignIn = jest.fn();
      const { enterValue, click, getByPlaceholderText, getByText } = mount(<SignUpUser requestSignIn={requestSignIn} />);

      postCreate.mockImplementationOnce(() => ({
        errors: {
          email: ['has been taken'],
        },
      }));

      enterValue(getByPlaceholderText('First Name'), 'Kyle');
      enterValue(getByPlaceholderText('Last Name'), 'Thompson');
      enterValue(getByPlaceholderText('Email'), 'email@example.com');
      enterValue(getByPlaceholderText('Password'), 'password');
      enterValue(getByPlaceholderText('Password Confirmation'), 'password');

      click(getByText('Next').parentElement);

      expect(postCreate).toHaveBeenCalledTimes(1);
      expect(postCreate).toHaveBeenCalledWith({
        email: 'email@example.com',
        firstName: 'Kyle',
        lastName: 'Thompson',
        password: 'password',
        passwordConfirmation: 'password',
      });

      await Promise.resolve(); // wait a tick for promises to resolve

      expect(requestSignIn).toHaveBeenCalledTimes(0);
    });
  });
});
