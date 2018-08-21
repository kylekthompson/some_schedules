import EntryPoint from 'src/components/entry-point';
import React from 'react';
import { mountWithRouter } from 'spec/support/mount';

describe('<EntryPoint />', () => {
  describe('routing', () => {
    it('routes to /sign-in', () => {
      const { getByText } = mountWithRouter(<EntryPoint />, '/sign-in');
      getByText('Sign In App');
    });

    it('routes to /sign-up', () => {
      const { getByText } = mountWithRouter(<EntryPoint />, '/sign-up');
      getByText('Sign Up App');
    });

    it('routes to /schedule', () => {
      const { getByText } = mountWithRouter(<EntryPoint />, '/schedule');
      getByText('Schedule');
    });

    it('routes to /', () => {
      const { getByText } = mountWithRouter(<EntryPoint />, '/');
      getByText(/description of someschedules/i);
    });
  });
});
