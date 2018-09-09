import React from 'react';
import SignInForm from 'apps/sign-in/sign-in-form';
import { User } from 'spec/support/factories';
import { mount } from 'spec/support/mount';
import { postSignIn } from 'apis/authentication';

jest.mock('apis/authentication');

describe('<SignInForm />', () => {
  it('properly validates the email and password', () => {
    const onSubmit = jest.fn();
    const { blur, enterValue, getByPlaceholderText, getByText, queryByText } = mount(<SignInForm onSubmit={onSubmit} />);

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
  });

  describe('when the sign in is successful', () => {
    it('calls the onSubmit callback and does not show the server error', async () => {
      const onSubmit = jest.fn();
      const { enterValue, click, getByPlaceholderText, getByText, queryByText, wait } = mount(<SignInForm onSubmit={onSubmit} />);

      const user = new User();
      postSignIn.mockImplementationOnce(() => ({
        me: user,
        status: 200,
      }));

      enterValue(getByPlaceholderText('Email'), 'some@email.com');
      enterValue(getByPlaceholderText('Password'), 'password');

      click(getByText('Submit').parentElement);

      expect(postSignIn).toHaveBeenCalledTimes(1);
      expect(postSignIn).toHaveBeenCalledWith({
        email: 'some@email.com',
        password: 'password',
      });

      await wait(() => expect(onSubmit).toHaveBeenCalledTimes(1));
      expect(onSubmit).toHaveBeenCalledWith(user);

      expect(queryByText('It looks like there was an issue with your email or password.')).toBeNull();
    });
  });

  describe('when the sign in is not successful', () => {
    it('does not call the onSubmit callback and shows the server error', async () => {
      const onSubmit = jest.fn();
      const { enterValue, click, getByPlaceholderText, getByText } = mount(<SignInForm onSubmit={onSubmit} />);

      postSignIn.mockImplementationOnce(() => ({
        me: null,
        status: 401,
      }));

      enterValue(getByPlaceholderText('Email'), 'some@email.com');
      enterValue(getByPlaceholderText('Password'), 'password');

      click(getByText('Submit').parentElement);

      expect(postSignIn).toHaveBeenCalledTimes(1);
      expect(postSignIn).toHaveBeenCalledWith({
        email: 'some@email.com',
        password: 'password',
      });

      await Promise.resolve(); // wait a tick for promises to resolve

      expect(onSubmit).toHaveBeenCalledTimes(0);

      getByText('It looks like there was an issue with your email or password.');
    });
  });
});
