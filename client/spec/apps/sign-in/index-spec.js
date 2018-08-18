import React from 'react';
import SignIn from 'src/apps/sign-in';
import mount from 'spec/support/mount';

describe('<SignIn />', () => {
  it('renders', () => {
    const { getByText } = mount(<SignIn />);
    getByText('Sign In');
  });
});
