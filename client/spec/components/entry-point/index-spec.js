import EntryPoint from 'src/components/entry-point';
import React from 'react';
import mount from 'spec/support/mount';

describe('<EntryPoint />', () => {
  it('renders', () => {
    const { getByText } = mount(<EntryPoint />);
    getByText(/description of someschedules/i);
  });
});
