import React from 'react';
import EntryPoint from 'src/components/entry-point';
import mount from 'spec/support/mount';

describe('<EntryPoint />', () => {
  it('renders', async () => {
    const { getByText, waitForElement } = mount(<EntryPoint />);
    await waitForElement(() => getByText('Marketing'));
  });
});
