import React from 'react';

import { mount } from 'enzyme';

import AuthenticationProvider from 'components/AuthenticationProvider';

const mountComponent = (props) => mount((
  <AuthenticationProvider
    render={() => null}
    {...props}
  />
));

describe('<AuthenticationProvider />', () => {
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
      isSignedIn: expect.any(Boolean),
      requestSignIn: expect.any(Function),
      requestSignOut: expect.any(Function),
    }));
  });

  it('sets the initial state with createInitialState', () => {
    const state = { state: 'state' };
    const createInitialState = jest.fn().mockReturnValue(state);
    const wrapper = mountComponent({
      createInitialState,
    });

    expect(wrapper.state()).toBe(state);
  });

  describe('requestSignIn()', () => {
    it('signs the user in', () => {
      const state = { isSignedIn: false };
      const createInitialState = jest.fn().mockReturnValue(state);
      const render = jest.fn().mockReturnValue(null);
      const wrapper = mountComponent({
        createInitialState,
        render,
      });

      const renderArguments = render.mock.calls[0][0];

      renderArguments.requestSignIn('token');

      expect(wrapper.state().isSignedIn).toEqual(true);
    });
  });

  describe('requestSignOut()', () => {
    it('signs the user out', () => {
      const state = { isSignedIn: true };
      const createInitialState = jest.fn().mockReturnValue(state);
      const render = jest.fn().mockReturnValue(null);
      const wrapper = mountComponent({
        createInitialState,
        render,
      });

      const renderArguments = render.mock.calls[0][0];

      renderArguments.requestSignOut();

      expect(wrapper.state().isSignedIn).toEqual(false);
    });
  });
});
