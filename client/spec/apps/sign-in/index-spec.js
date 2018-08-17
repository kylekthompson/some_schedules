import SignIn from 'src/apps/sign-in';
import React from 'react';
import mount from 'spec/support/mount';

describe('<SignIn />', () => {
  it('renders', async () => {
    const { getByText, waitForElement } = mount(<SignIn />);
    await waitForElement(() => getByText('Sign In'));
  });
});
