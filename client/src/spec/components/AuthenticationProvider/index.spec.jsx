import React from 'react';

import { mount } from 'enzyme';

import AuthenticationProvider from 'components/AuthenticationProvider';

const mountComponent = (props) => mount(
  <AuthenticationProvider
    render={() => null}
    {...props}
  />
);

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
    const wrapper = mountComponent({ render });

    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenCalledWith(expect.objectContaining({
      isSignedIn: expect.any(Boolean),
      requestSignIn: expect.any(Function),
      requestSignOut: expect.any(Function),
    }));
  });

  describe('the first render', () => {
    describe('when the user is already signed in', () => {
      it('has the correct starting state', () => {
        const wrapper = mountComponent({
          isSignedIn: () => true,
        });

        expect(wrapper.state().isSignedIn).toEqual(true);
      });
    });

    describe('when the user is not already signed in', () => {
      it('has the correct starting state', () => {
        const wrapper = mountComponent({
          isSignedIn: () => false,
        });

        expect(wrapper.state().isSignedIn).toEqual(false);
      });
    });
  });

  describe('when requestSignOut() is called', () => {
    describe('when the user is signed in', () => {
      it('signs the user out', () => {
        const deleteToken = jest.fn();
        const render = jest.fn().mockReturnValue(null);
        const wrapper = mountComponent({
          deleteToken,
          isSignedIn: () => true,
          render,
        });

        render.mock.calls[0][0].requestSignOut();

        expect(deleteToken).toHaveBeenCalledTimes(1);
        expect(wrapper.state().isSignedIn).toEqual(false);
      });
    });

    describe('when the user is not already signed in', () => {
      it('keeps the user signed out', () => {
        const deleteToken = jest.fn();
        const render = jest.fn().mockReturnValue(null);
        const wrapper = mountComponent({
          deleteToken,
          isSignedIn: () => false,
          render,
        });

        render.mock.calls[0][0].requestSignOut();

        expect(deleteToken).toHaveBeenCalledTimes(1);
        expect(wrapper.state().isSignedIn).toEqual(false);
      });
    });
  });

  describe('when requestSignIn() is called', () => {
    describe('when the user is signed in', () => {
      it('keeps the user signed in', () => {
        const token = 'some_token';
        const setToken = jest.fn();
        const render = jest.fn().mockReturnValue(null);
        const wrapper = mountComponent({
          setToken,
          isSignedIn: () => true,
          render,
        });

        render.mock.calls[0][0].requestSignIn(token);

        expect(setToken).toHaveBeenCalledTimes(1);
        expect(setToken).toHaveBeenCalledWith(token);
        expect(wrapper.state().isSignedIn).toEqual(true);
      });
    });

    describe('when the user is not already signed in', () => {
      it('keeps the user signed out', () => {
        const token = 'some_token';
        const setToken = jest.fn();
        const render = jest.fn().mockReturnValue(null);
        const wrapper = mountComponent({
          setToken,
          isSignedIn: () => false,
          render,
        });

        render.mock.calls[0][0].requestSignIn(token);

        expect(setToken).toHaveBeenCalledTimes(1);
        expect(setToken).toHaveBeenCalledWith(token);
        expect(wrapper.state().isSignedIn).toEqual(true);
      });
    });
  });
});
