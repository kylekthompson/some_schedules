import Schedule from 'src/apps/schedule';
import React from 'react';
import mount from 'spec/support/mount';

describe('<Schedule />', () => {
  it('renders', async () => {
    const { getByText, waitForElement } = mount(<Schedule />);
    await waitForElement(() => getByText('Schedule'));
  });
});
