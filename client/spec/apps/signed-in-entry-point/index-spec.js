import React from 'react';
import SignedInEntryPoint from 'apps/signed-in-entry-point';
import { AuthenticationContextValue, User } from 'spec/support/factories';
import { mountAsApp } from 'spec/support/mount';

const signedInOwner = new AuthenticationContextValue().signedIn(new User().asOwner());
const signedInEmployee = new AuthenticationContextValue().signedIn(new User().asEmployee());

describe('<SignedInEntryPoint />', () => {
  describe('as an owner', () => {
    it('redirects from / to /schedule', () => {
      const { getByText } = mountAsApp(<SignedInEntryPoint />, {
        authenticationContextValue: signedInOwner,
        route: '/',
      });

      getByText('Schedule App');
    });

    it('can get to /schedule', () => {
      const { click, getByText } = mountAsApp(<SignedInEntryPoint />, {
        authenticationContextValue: signedInOwner,
        route: '/schedule',
      });

      click(getByText('Schedule'));

      getByText('Schedule App');
    });

    it('can get to /company-settings', () => {
      const { click, getByText } = mountAsApp(<SignedInEntryPoint />, {
        authenticationContextValue: signedInOwner,
        route: '/schedule',
      });

      click(getByText('Company Settings'));

      getByText('Invitations');
    });
  });

  describe('as any other role', () => {
    it('redirects from / to /schedule', () => {
      const { getByText } = mountAsApp(<SignedInEntryPoint />, {
        authenticationContextValue: signedInOwner,
        route: '/',
      });

      getByText('Schedule App');
    });

    it('can get to /schedule', () => {
      const { click, getByText } = mountAsApp(<SignedInEntryPoint />, {
        authenticationContextValue: signedInEmployee,
        route: '/schedule',
      });

      click(getByText('Schedule'));

      getByText('Schedule App');
    });

    it('cannot get to /company-settings', () => {
      const { getByText } = mountAsApp(<SignedInEntryPoint />, {
        authenticationContextValue: signedInEmployee,
        route: '/company-settings',
      });

      getByText('Not Found');
    });
  });
});
