import EntryPoint from 'apps/entry-point';
import React from 'react';
import { AuthenticationContextValue, Company, User } from 'spec/support/factories';
import { mountAsApp } from 'spec/support/mount';

describe('<EntryPoint />', () => {
  describe('routing', () => {
    describe('when signed in', () => {
      describe('when the user is part of a company', () => {
        const user = new User({ company: new Company() });

        it('redirects from /sign-in to /schedule', () => {
          const { getByText, queryByText } = mountAsApp(<EntryPoint />, {
            authenticationContextValue: new AuthenticationContextValue().signedIn(user),
            route: '/sign-in',
          });

          expect(queryByText('Sign In')).toBeNull();
          getByText('Schedule');
        });

        it('redirects from /sign-up to /schedule', () => {
          const { getByText, queryByText } = mountAsApp(<EntryPoint />, {
            authenticationContextValue: new AuthenticationContextValue().signedIn(user),
            route: '/sign-up',
          });

          expect(queryByText('Sign Up -')).toBeNull();
          getByText('Schedule');
        });

        it('routes to /schedule', () => {
          const { getByText } = mountAsApp(<EntryPoint />, {
            authenticationContextValue: new AuthenticationContextValue().signedIn(user),
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

      describe('when the user is not part of a company', () => {
        const user = new User({ company: null });

        it('redirects from /sign-in to /sign-up', () => {
          const { getByText, queryByText } = mountAsApp(<EntryPoint />, {
            authenticationContextValue: new AuthenticationContextValue().signedIn(user),
            route: '/sign-in',
          });

          expect(queryByText('Sign In')).toBeNull();
          getByText('Sign Up - Company');
        });

        it('routes to /sign-up', () => {
          const { getByText } = mountAsApp(<EntryPoint />, {
            authenticationContextValue: new AuthenticationContextValue().signedIn(user),
            route: '/sign-up',
          });

          getByText('Sign Up - Company');
        });

        it('redirects from /schedule to /sign-up', () => {
          const { getByText, queryByText } = mountAsApp(<EntryPoint />, {
            authenticationContextValue: new AuthenticationContextValue().signedIn(user),
            route: '/schedule',
          });

          expect(queryByText('Schedule')).toBeNull();
          getByText('Sign Up - Company');
        });

        it('redirects from / to /sign-up', () => {
          const { getByText, queryByText } = mountAsApp(<EntryPoint />, {
            authenticationContextValue: new AuthenticationContextValue().signedIn(user),
            route: '/',
          });

          expect(queryByText(/description of someschedules/i)).toBeNull();
          getByText('Sign Up - Company');
        });
      });
    });

    describe('when signed out', () => {
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

        getByText('Sign Up - User');
      });

      it('does not route to /schedule', () => {
        const { queryByText } = mountAsApp(<EntryPoint />, {
          authenticationContextValue: new AuthenticationContextValue().signedOut(),
          route: '/schedule',
        });

        expect(queryByText('Schedule')).toBeNull();
      });

      it('routes to /', () => {
        const { getByText } = mountAsApp(<EntryPoint />, {
          authenticationContextValue: new AuthenticationContextValue().signedOut(),
          route: '/',
        });

        getByText(/description of someschedules/i);
      });
    });
  });
});
