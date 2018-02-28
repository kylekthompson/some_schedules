import React from 'react';

import { mount } from 'enzyme';

import Form from 'components/Form';
import SignInForm from 'components/SignInForm';
import { changeValue, findTestId } from 'spec/utilities';

const mountComponent = (props) => mount((
  <SignInForm
    onSubmit={() => {}}
    {...props}
  />
));

describe('<SignInForm />', () => {
  describe('when it is not valid', () => {
    it('shows errors for invalid fields', () => {
      const wrapper = mountComponent();

      findTestId(wrapper, 'email').props().onBlur({
        currentTarget: {
          value: 'not an email',
        },
      });

      wrapper.update();

      expect(wrapper.find(Form.Errors)).toHaveLength(1);
    });


    describe('when the Sign In button is clicked', () => {
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
    describe('when the Sign In button is clicked', () => {
      it('calls onSubmit()', () => {
        const onSubmit = jest.fn();
        const wrapper = mountComponent({
          onSubmit,
        });

        changeValue(wrapper, 'email', 'email@example.com');
        changeValue(wrapper, 'password', 'password');

        wrapper.find(Form).simulate('submit');

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
          email: 'email@example.com',
          password: 'password',
        });
      });
    });
  });
});
