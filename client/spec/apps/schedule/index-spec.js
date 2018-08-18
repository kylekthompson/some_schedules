import React from 'react';
import Schedule from 'src/apps/schedule';
import mount from 'spec/support/mount';

describe('<Schedule />', () => {
  it('renders', () => {
    const { getByText } = mount(<Schedule />);
    getByText('Schedule');
  });
});
