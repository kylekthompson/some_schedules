import React from 'react';
import { Container } from 'src/components/style';
import { mount } from 'spec/support/mount';

describe('<Container />', () => {
  describe('without any props', () => {
    it('is a div with flex 1 and flex direction column', () => {
      const { container } = mount(<Container />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when passed a flex', () => {
    it('has the specified flex', () => {
      const { container } = mount(<Container flex="none" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when passed a flexDirection', () => {
    it('has the specified flexDirection', () => {
      const { container } = mount(<Container flexDirection="row" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when passed children', () => {
    it('renders the children', () => {
      const { getByText } = mount(<Container>Words</Container>);
      getByText('Words');
    });
  });
});
