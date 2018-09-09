import EntryPoint from 'components/entry-point';
import React from 'react';
import { AuthenticationContextValue } from 'spec/support/factories';
import { mountAsApp } from 'spec/support/mount';

describe('<EntryPoint />', () => {
  describe('routing', () => {
    it('routes to /sign-in', () => {
      const { getByPlaceholderText, getByText } = mountAsApp(<EntryPoint />, {
        authenticationContextValue: new AuthenticationContextValue().signedOut(),
        route: '/sign-in',
      });
      getByText('Sign In');
      getByPlaceholderText('Email');
      getByPlaceholderText('Password');
    });

    it('routes to /sign-up', () => {
      const { getByText } = mountAsApp(<EntryPoint />, {
        authenticationContextValue: new AuthenticationContextValue().signedOut(),
        route: '/sign-up',
      });
      getByText('Sign Up App');
    });

    it('routes to /schedule', () => {
      const { getByText } = mountAsApp(<EntryPoint />, {
        authenticationContextValue: new AuthenticationContextValue().signedIn(),
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
