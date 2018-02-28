import React from 'react';

import { mount } from 'enzyme';

import { Consumer, Provider } from 'components/Authentication';
import { waitUntil } from 'spec/utilities';

const mountComponent = (props) => mount((
  <Provider
    getContext={jest.fn().mockReturnValue(Promise.resolve({ context: {} }))}
    postSignOut={jest.fn().mockReturnValue(Promise.resolve())}
    {...props}
  >
    <Consumer
      render={() => null}
      {...props}
    />
  </Provider>
));

describe('<Consumer />', () => {
  it('renders using the render prop', () => {
    const rendered = <p>Rendered</p>;
    const wrapper = mountComponent({
      render: () => rendered,
    });

    expect(wrapper.contains(rendered)).toEqual(true);
  });

  it('passes the correct props to the render function', () => {
    const render = jest.fn().mockReturnValue(null);
    mountComponent({ render });

    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      isAdmin: expect.any(Boolean),
      isSignedIn: expect.any(Boolean),
      requestSignIn: expect.any(Function),
      requestSignOut: expect.any(Function),
      role: null,
    }));
  });

  describe('rendering', () => {
    it('uses the cache for the first render', () => {
      const cache = {
        clear: jest.fn(),
        get: jest.fn().mockReturnValue({
          isAdmin: false,
          isSignedIn: true,
          role: 'role',
        }),
        set: jest.fn(),
      };
      const render = jest.fn().mockReturnValue(null);
      mountComponent({
        cache,
        render,
      });

      expect(cache.get).toHaveBeenCalledTimes(1);
      expect(render).toHaveBeenCalledTimes(1);
      expect(render).toHaveBeenCalledWith(expect.objectContaining({
        isAdmin: false,
        isSignedIn: true,
        requestSignIn: expect.any(Function),
        requestSignOut: expect.any(Function),
        role: 'role',
      }));
    });
  });

  describe('componentDidMount()', () => {
    it('updates with the result of the context and resets the cache', async () => {
      const cache = {
        clear: jest.fn(),
        get: jest.fn().mockReturnValue({
          isAdmin: false,
          isSignedIn: true,
          role: 'role',
        }),
        set: jest.fn(),
      };
      const getContext = jest.fn().mockReturnValue({
        context: {
          isAdmin: false,
          isSignedIn: false,
          role: null,
        },
      });
      const render = jest.fn().mockReturnValue(null);
      mountComponent({
        cache,
        getContext,
        render,
      });

      await waitUntil(() => render.mock.calls.length === 2);

      expect(cache.set).toHaveBeenCalledTimes(1);
      expect(render).toHaveBeenCalledTimes(2);
      expect(render).toHaveBeenCalledWith(expect.objectContaining({
        isAdmin: false,
        isSignedIn: false,
        requestSignIn: expect.any(Function),
        requestSignOut: expect.any(Function),
        role: null,
      }));
    });
  });

  describe('requestSignIn()', () => {
    it('updates and resets the cache', async () => {
      const cache = {
        clear: jest.fn(),
        get: jest.fn().mockReturnValue({
          isAdmin: false,
          isSignedIn: false,
          role: null,
        }),
        set: jest.fn(),
      };
      const render = jest.fn().mockReturnValue(null);
      mountComponent({
        cache,
        render,
      });

      await waitUntil(() => render.mock.calls.length === 2);

      render.mock.calls[0][0].requestSignIn({
        isAdmin: true,
        isSignedIn: true,
        role: 'role',
      });

      expect(cache.set).toHaveBeenCalledTimes(2);
      expect(render).toHaveBeenCalledTimes(3);
      expect(render).toHaveBeenCalledWith(expect.objectContaining({
        isAdmin: true,
        isSignedIn: true,
        requestSignIn: expect.any(Function),
        requestSignOut: expect.any(Function),
        role: 'role',
      }));
    });
  });

  describe('requestSignOut()', () => {
    it('updates and clears the cache', async () => {
      const cache = {
        clear: jest.fn(),
        get: jest.fn().mockReturnValue({
          isAdmin: true,
          isSignedIn: true,
          role: 'role',
        }),
        set: jest.fn(),
      };
      const render = jest.fn().mockReturnValue(null);
      mountComponent({
        cache,
        render,
      });

      await waitUntil(() => render.mock.calls.length === 2);

      render.mock.calls[0][0].requestSignOut();

      expect(cache.clear).toHaveBeenCalledTimes(1);
      expect(render).toHaveBeenCalledTimes(3);
      expect(render).toHaveBeenCalledWith(expect.objectContaining({
        isAdmin: false,
        isSignedIn: false,
        requestSignIn: expect.any(Function),
        requestSignOut: expect.any(Function),
        role: null,
      }));
    });
  });
});
