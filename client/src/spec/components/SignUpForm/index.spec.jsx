import React from 'react';

import { mount } from 'enzyme';

import Form from 'components/Form';
import SignUpForm from 'components/SignUpForm';
import { changeValue, findTestId } from 'spec/utilities';

const mountComponent = (props) => mount(
  <SignUpForm
    onSubmit={() => {}}
    {...props}
  />
);

describe('<SignUpForm />', () => {
  describe('when it is not valid', () => {
    it('shows errors for invalid fields', () => {
      const wrapper = mountComponent();

      findTestId(wrapper, 'user-email').props().onBlur({
        currentTarget: {
          value: 'not an email',
        },
      });

      wrapper.update();

      expect(wrapper.find(Form.Errors)).toHaveLength(1);
    });


    describe('when the Sign Up button is clicked', () => {
      it('does not call onSubmit()', () => {
        const onSubmit = jest.fn();
        const wrapper = mountComponent({
          onSubmit,
        });

        wrapper.find(Form).simulate('submit');

        expect(onSubmit).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('when it is valid', () => {
    describe('when the Sign Up button is clicked', () => {
      it('calls onSubmit()', () => {
        const onSubmit = jest.fn();
        const wrapper = mountComponent({
          onSubmit,
        });

        changeValue(wrapper, 'company-name', 'Company');
        changeValue(wrapper, 'company-slug', 'company');
        changeValue(wrapper, 'user-email', 'email@example.com');
        changeValue(wrapper, 'user-first-name', 'First');
        changeValue(wrapper, 'user-last-name', 'Last');
        changeValue(wrapper, 'user-password', 'password');
        changeValue(wrapper, 'user-password-confirmation', 'password');

        wrapper.find(Form).simulate('submit');

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
          name: 'Company',
          slug: 'company',
          email: 'email@example.com',
          firstName: 'First',
          lastName: 'Last',
          password: 'password',
          passwordConfirmation: 'password',
        });
      });
    });
  });
});
