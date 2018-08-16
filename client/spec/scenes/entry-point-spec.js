import React from 'react';
import EntryPoint from 'src/scenes/entry-point';
import mount from 'spec/support/mount';

describe('<EntryPoint />', () => {
  it('renders', async () => {
    const { getByText, waitForElement } = mount(<EntryPoint />);
    await waitForElement(() => getByText('Hello React'));
  });
});
