jest.mock('models/authentication-context/cache');

import React from 'react';
import { AuthenticationContextValue } from 'spec/factories';
import { Consumer, Provider } from 'components/authentication';
import { getContext } from 'apis/authentication';
import { cache } from 'models/authentication-context';
import { render, wait } from 'react-testing-library';

const mount = (overrides = {}) => {
  const { consumer = {}, provider = {} } = overrides;

  return render(
    <Provider value={new AuthenticationContextValue()} {...provider}>
      <Consumer render={() => null} {...consumer} />
    </Provider>,
  );
};

describe('<Provider />', () => {
  beforeEach(() => {
    cache._reset();
  });

  describe('rendering', () => {
    it('uses the cache for the first render', () => {
      const render = jest.fn(() => null);
      cache.set({
        isAdmin: false,
        isSignedIn: true,
        role: 'role',
      });

      mount({
        consumer: {
          render,
        },
      });

      expect(cache.get).toHaveBeenCalledTimes(1);
      expect(render).toHaveBeenCalledTimes(1);
      expect(render).toHaveBeenCalledWith(
        expect.objectContaining({
          isAdmin: false,
          isSignedIn: true,
          requestSignIn: expect.any(Function),
          requestSignOut: expect.any(Function),
          role: 'role',
        }),
      );
    });
  });

  describe('componentDidMount()', () => {
    it('updates with the result of the call to getContext and resets the cache', async () => {
      const render = jest.fn(() => null);

      getContext.mockImplementationOnce(() => ({
        context: {
          isAdmin: true,
          isSignedIn: true,
          role: 'some_role',
        },
      }));

      mount({
        consumer: {
          render,
        },
      });

      await wait(() => expect(render).toHaveBeenCalledTimes(2));

      expect(cache.set).toHaveBeenCalledTimes(1);
      expect(render).toHaveBeenLastCalledWith(
        expect.objectContaining({
          isAdmin: true,
          isSignedIn: true,
          requestSignIn: expect.any(Function),
          requestSignOut: expect.any(Function),
          role: 'some_role',
        }),
      );
    });
  });

  describe('requestSignIn()', () => {
    it('updates and resets the cache', async () => {
      const render = jest.fn(() => null);

      mount({
        consumer: {
          render,
        },
      });

      await wait(() => expect(render).toHaveBeenCalledTimes(2));

      render.mock.calls[1][0].requestSignIn({
        isAdmin: true,
        isSignedIn: true,
        role: 'role',
      });

      expect(cache.set).toHaveBeenCalledTimes(2);
      expect(render).toHaveBeenCalledTimes(3);
      expect(render).toHaveBeenLastCalledWith(
        expect.objectContaining({
          isAdmin: true,
          isSignedIn: true,
          requestSignIn: expect.any(Function),
          requestSignOut: expect.any(Function),
          role: 'role',
        }),
      );
    });
  });

  describe('requestSignOut()', () => {
    it('updates and clears the cache', async () => {
      const render = jest.fn(() => null);

      mount({
        consumer: {
          render,
        },
      });

      await wait(() => expect(render).toHaveBeenCalledTimes(2));

      render.mock.calls[1][0].requestSignOut();

      await wait(() => expect(cache.clear).toHaveBeenCalledTimes(1));

      expect(render).toHaveBeenCalledTimes(3);
      expect(render).toHaveBeenLastCalledWith(
        expect.objectContaining({
          isAdmin: false,
          isSignedIn: false,
          requestSignIn: expect.any(Function),
          requestSignOut: expect.any(Function),
          role: null,
        }),
      );
    });
  });
});
