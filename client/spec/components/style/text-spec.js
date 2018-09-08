import React from 'react';
import { Text } from 'components/style';
import { colors } from 'models/style';
import { mount } from 'spec/support/mount';

describe('<Text />', () => {
  describe('without any props', () => {
    it('is a paragraph tag with font size 12px and color black', () => {
      const { container } = mount(<Text />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when passed a size', () => {
    it('has the specified font size', () => {
      const { container } = mount(<Text size={20} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when passed a color', () => {
    it('has the specified color', () => {
      const { container } = mount(<Text color={colors.white()} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when passed a component', () => {
    it('renders that component', () => {
      const { container } = mount(<Text component="span" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when passed children', () => {
    it('renders the children', () => {
      const { getByText } = mount(<Text>Words</Text>);
      getByText('Words');
    });
  });
});
