import React from 'react';

import { mount } from 'enzyme';

import HeaderLinksProvider from 'components/header-links-provider';

const mountComponent = (props) => mount((
  <HeaderLinksProvider
    initialHeaderLinks={<div />}
    render={() => null}
    {...props}
  />
));

describe('<HeaderLinksProvider />', () => {
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
      headerLinks: expect.any(Object),
      setHeaderLinks: expect.any(Function),
    }));
  });

  describe('the first render', () => {
    it('passes the initial header links', () => {
      const initialHeaderLinks = <div />;
      const render = jest.fn().mockReturnValue(null);

      mountComponent({
        initialHeaderLinks,
        render,
      });

      expect(render).toHaveBeenCalledTimes(1);
      expect(render).toHaveBeenCalledWith(expect.objectContaining({
        headerLinks: initialHeaderLinks,
      }));
    });
  });

  describe('when setHeaderLinks() is called', () => {
    it('sets the header links', () => {
      const initialHeaderLinks = <div />;
      const render = jest.fn().mockReturnValue(null);

      mountComponent({
        initialHeaderLinks,
        render,
      });

      render.mock.calls[0][0].setHeaderLinks(null);

      expect(render).toHaveBeenCalledTimes(2);
      expect(render).toHaveBeenCalledWith(expect.objectContaining({
        headerLinks: null,
      }));
    });
  });
});
