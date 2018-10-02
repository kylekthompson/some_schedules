import NotFound from 'apps/not-found';
import React from 'react';
import { mount } from 'spec/support/mount';

describe('<NotFound />', () => {
  it('shows not found', () => {
    const { getByText } = mount(<NotFound />);

    getByText('Not Found');
  });
});
