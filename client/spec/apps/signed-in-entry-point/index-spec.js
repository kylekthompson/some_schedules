import EntryPoint from 'apps/entry-point';
import React from 'react';
import { mountAsApp } from 'spec/support/mount';

describe('<EntryPoint />', () => {
  it('routes to /schedule', () => {
    const { getByText } = mountAsApp(<EntryPoint />, {
      route: '/schedule',
    });

    getByText('Schedule');
  });

  it('redirects from / to /schedule', () => {
    const { getByText } = mountAsApp(<EntryPoint />, {
      route: '/',
    });

    getByText('Schedule');
  });
});
