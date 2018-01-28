import React from 'react';

import { mount } from 'enzyme';

import Form from 'components/Form';
import SignUpForm from 'components/SignUpForm';

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

      wrapper.find('input').find('[id="user-email"]').props().onBlur({
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
      const setField = (wrapper, id, value) => {
        wrapper.find('input').find(`[id="${id}"]`).props().onChange({
          currentTarget: {
            value,
          },
        });
      };

      it('calls onSubmit()', () => {
        const onSubmit = jest.fn();
        const wrapper = mountComponent({
          onSubmit,
        });

        setField(wrapper, 'company-name', 'Company');
        setField(wrapper, 'company-slug', 'company');
        setField(wrapper, 'user-email', 'email@example.com');
        setField(wrapper, 'user-first-name', 'First');
        setField(wrapper, 'user-last-name', 'Last');
        setField(wrapper, 'user-password', 'password');
        setField(wrapper, 'user-password-confirmation', 'password');

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
