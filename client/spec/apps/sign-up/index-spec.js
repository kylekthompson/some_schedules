import SignUp from 'src/apps/sign-up';
import React from 'react';
import mount from 'spec/support/mount';

describe('<SignUp />', () => {
  it('renders', async () => {
    const { getByText, waitForElement } = mount(<SignUp />);
    await waitForElement(() => getByText('Sign Up'));
  });
});
