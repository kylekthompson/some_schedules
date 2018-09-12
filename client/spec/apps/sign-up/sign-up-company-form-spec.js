import React from 'react';
import SignUpCompanyForm from 'apps/sign-up/sign-up-company-form';
import { Company } from 'spec/support/factories';
import { mount } from 'spec/support/mount';
import { postCreate } from 'apis/companies';

jest.mock('apis/companies');

describe('<SignUpCompanyForm />', () => {
  it('properly validates the company fields', () => {
    const onSuccess = jest.fn();
    const { blur, enterValue, getByPlaceholderText, getByText, queryByText } = mount(<SignUpCompanyForm onSuccess={onSuccess} />);

    enterValue(getByPlaceholderText('Company Name'), '');
    blur(getByPlaceholderText('Company Name'));

    getByText('Looks like you need 1 more character');

    enterValue(getByPlaceholderText('Company Name'), 'Company');
    blur(getByPlaceholderText('Company Name'));

    expect(queryByText(/Looks like you need \d+ more characters?/)).toBeNull();
  });

  describe('when the sign up is successful', () => {
    it('calls the onSuccess callback and does not show server errors', async () => {
      const onSuccess = jest.fn();
      const { enterValue, click, getByPlaceholderText, getByText, wait } = mount(<SignUpCompanyForm onSuccess={onSuccess} />);

      const company = new Company();
      postCreate.mockImplementationOnce(() => ({
        company,
      }));

      enterValue(getByPlaceholderText('Company Name'), 'Company');

      click(getByText('Submit').parentElement);

      expect(postCreate).toHaveBeenCalledTimes(1);
      expect(postCreate).toHaveBeenCalledWith({
        name: 'Company',
      });

      await wait(() => expect(onSuccess).toHaveBeenCalledTimes(1));
      expect(onSuccess).toHaveBeenCalledWith(company);
    });
  });

  describe('when the sign in is not successful', () => {
    it('does not call the onSuccess callback and shows the server error', async () => {
      const onSuccess = jest.fn();
      const { enterValue, click, getByPlaceholderText, getByText } = mount(<SignUpCompanyForm onSuccess={onSuccess} />);

      postCreate.mockImplementationOnce(() => ({
        errors: {
          name: ['has been taken'],
        },
      }));

      enterValue(getByPlaceholderText('Company Name'), 'Company');

      click(getByText('Submit').parentElement);

      expect(postCreate).toHaveBeenCalledTimes(1);
      expect(postCreate).toHaveBeenCalledWith({
        name: 'Company',
      });

      await Promise.resolve(); // wait a tick for promises to resolve

      expect(onSuccess).toHaveBeenCalledTimes(0);

      getByText('has been taken');
    });
  });
});
