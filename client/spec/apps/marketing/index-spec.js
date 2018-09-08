import Marketing from 'apps/marketing';
import React from 'react';
import { mount } from 'spec/support/mount';

describe('<Marketing />', () => {
  it('renders', () => {
    const { getByText } = mount(<Marketing />);
    getByText(/description of someschedules/i);
  });
});
