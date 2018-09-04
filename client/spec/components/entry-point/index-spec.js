import EntryPoint from 'components/entry-point';
import React from 'react';
import { AuthenticationContext } from 'spec/support/factories';
import { mountAsApp } from 'spec/support/mount';

describe('<EntryPoint />', () => {
  describe('routing', () => {
    it('routes to /sign-in', () => {
      const { getByText } = mountAsApp(<EntryPoint />, {
        authenticationContext: new AuthenticationContext().signedOut().withRequests(),
        route: '/sign-in',
      });
      getByText('Sign In App');
    });

    it('routes to /sign-up', () => {
      const { getByText } = mountAsApp(<EntryPoint />, {
        authenticationContext: new AuthenticationContext().signedOut().withRequests(),
        route: '/sign-up',
      });
      getByText('Sign Up App');
    });

    it('routes to /schedule', () => {
      const { getByText } = mountAsApp(<EntryPoint />, {
        authenticationContext: new AuthenticationContext().signedIn().withRequests(),
        route: '/schedule',
      });
      getByText('Schedule');
    });

    it('routes to /', () => {
      const { getByText } = mountAsApp(<EntryPoint />, {
        route: '/',
      });
      getByText(/description of someschedules/i);
    });
  });
});
