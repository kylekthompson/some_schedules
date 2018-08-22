import React from 'react';
import { Box } from 'src/components/style';
import { css } from 'styled-components';
import { mount } from 'spec/support/mount';

describe('<Box />', () => {
  describe('without any props', () => {
    it('is a div with flex 1 and flex direction column', () => {
      const { container } = mount(<Box />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when passed a flex', () => {
    it('has the specified flex', () => {
      const { container } = mount(<Box flex="none" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when passed a flexDirection', () => {
    it('has the specified flexDirection', () => {
      const { container } = mount(<Box flexDirection="row" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when passed overrides', () => {
    it('has the overrides', () => {
      const { container } = mount(<Box overrides={css`background-color: blue;`} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when passed children', () => {
    it('renders the children', () => {
      const { getByText } = mount(<Box>Words</Box>);
      getByText('Words');
    });
  });
});
