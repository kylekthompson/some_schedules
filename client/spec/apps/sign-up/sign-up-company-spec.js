import React from 'react';
import { Company, User } from 'spec/support/factories';
import { SignUpCompany } from 'apps/sign-up/sign-up-company';
import { mount } from 'spec/support/mount';
import { postCreate } from 'apis/companies';

jest.mock('apis/companies');

describe('<SignUpCompany />', () => {
  describe('when the sign up is successful', () => {
    it('handles the sign up', async () => {
      const requestSignIn = jest.fn();
      const user = new User({ company: null });
      const { enterValue, click, getByPlaceholderText, getByText, wait } = mount(<SignUpCompany requestSignIn={requestSignIn} user={user} />);

      const company = new Company();
      postCreate.mockImplementationOnce(() => ({ company }));

      enterValue(getByPlaceholderText('Company Name'), 'Kyle\'s Company');

      click(getByText('Submit').parentElement);

      expect(postCreate).toHaveBeenCalledTimes(1);
      expect(postCreate).toHaveBeenCalledWith({
        name: 'Kyle\'s Company',
      });

      await wait(() => expect(requestSignIn).toHaveBeenCalledTimes(1));
      expect(requestSignIn).toHaveBeenCalledWith({ ...user, company });
    });
  });

  describe('when the sign up is not successful', () => {
    it('does not handle the sign up', async () => {
      const requestSignIn = jest.fn();
      const user = new User({ company: null });
      const { enterValue, click, getByPlaceholderText, getByText } = mount(<SignUpCompany requestSignIn={requestSignIn} user={user} />);

      postCreate.mockImplementationOnce(() => ({
        errors: {
          name: ['has been taken'],
        },
      }));

      enterValue(getByPlaceholderText('Company Name'), 'Kyle\'s Company');

      click(getByText('Submit').parentElement);

      expect(postCreate).toHaveBeenCalledTimes(1);
      expect(postCreate).toHaveBeenCalledWith({
        name: 'Kyle\'s Company',
      });

      await Promise.resolve(); // wait a tick for promises to resolve

      expect(requestSignIn).toHaveBeenCalledTimes(0);
    });
  });
});
