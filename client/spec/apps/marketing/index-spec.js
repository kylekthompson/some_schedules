import Marketing from 'src/apps/marketing';
import React from 'react';
import mount from 'spec/support/mount';

describe('<Marketing />', () => {
  it('renders', async () => {
    const { getByText, waitForElement } = mount(<Marketing />);
    await waitForElement(() => getByText('Marketing'));
  });
});
