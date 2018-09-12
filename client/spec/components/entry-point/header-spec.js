import React from 'react';
import { Company, User } from 'spec/support/factories';
import { Header } from 'components/entry-point/header';
import { Route } from 'react-router-dom';
import { mountAsApp } from 'spec/support/mount';

function App({ requestSignOut = jest.fn(), user = null }) {
  return (
    <>
      <Header requestSignOut={requestSignOut} user={user} />
      <Route path="/sign-in" render={() => <p>got sign in</p>} />
      <Route path="/sign-up" render={() => <p>got sign up</p>} />
      <Route path="/" render={() => <p>got home</p>} />
    </>
  );
}

describe('<Header />', () => {
  describe('the navigation links', () => {
    describe('when there is a user', () => {
      describe('when the user is part of a company', () => {
        it('can sign out', () => {
          const requestSignOut = jest.fn();
          const { click, getByText } = mountAsApp(<App requestSignOut={requestSignOut} user={new User({ company: new Company() })} />, {
            route: '/',
          });

          click(getByText('Sign Out'));

          expect(requestSignOut).toHaveBeenCalledTimes(1);
        });

        it('cannot sign in or up', () => {
          const { queryByText } = mountAsApp(<App user={new User({ company: new Company() })} />, {
            route: '/',
          });

          expect(queryByText('Sign Up')).toBeNull();
          expect(queryByText('Sign In')).toBeNull();
          expect(queryByText('Finish Sign Up')).toBeNull();
        });
      });

      describe('when the user is not part of a company', () => {
        it('can sign out', () => {
          const requestSignOut = jest.fn();
          const { click, getByText } = mountAsApp(<App requestSignOut={requestSignOut} user={new User({ company: null })} />, {
            route: '/',
          });

          click(getByText('Sign Out'));

          expect(requestSignOut).toHaveBeenCalledTimes(1);
        });

        it('can finish sign up', () => {
          const { click, getByText } = mountAsApp(<App user={new User({ company: null })} />, {
            route: '/',
          });

          click(getByText('Finish Sign Up'));

          getByText('got sign up');
        });

        it('cannot sign in', () => {
          const { queryByText } = mountAsApp(<App user={new User({ company: null })} />, {
            route: '/',
          });

          expect(queryByText('Sign In')).toBeNull();
        });
      });
    });

    describe('when there is not a user', () => {
      it('can sign-in', () => {
        const { click, getByText } = mountAsApp(<App user={null} />, {
          route: '/',
        });

        click(getByText('Sign In'));

        getByText('got sign in');
      });

      it('can sign-up', () => {
        const { click, getByText } = mountAsApp(<App user={null} />, {
          route: '/',
        });

        click(getByText('Sign Up'));

        getByText('got sign up');
      });

      it('cannot sign out', () => {
        const { queryByText } = mountAsApp(<App user={null} />, {
          route: '/',
        });

        expect(queryByText('Sign Out')).toBeNull();
      });
    });
  });

  describe('the company name', () => {
    it('can navigate to /', () => {
      const { click, getByText } = mountAsApp(<App />, {
        route: '/sign-in',
      });

      click(getByText('SomeSchedules'));

      getByText('got home');
    });
  });
});
