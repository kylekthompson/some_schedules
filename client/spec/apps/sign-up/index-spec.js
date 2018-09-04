import React from 'react';
import SignUp from 'apps/sign-up';
import { mount } from 'spec/support/mount';

describe('<SignUp />', () => {
  it('renders', () => {
    const { getByText } = mount(<SignUp />);
    getByText('Sign Up App');
  });
});
