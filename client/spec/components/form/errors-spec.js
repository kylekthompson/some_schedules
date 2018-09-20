import React from 'react';
import { Errors } from 'components/form';
import { mount } from 'spec/support/mount';

describe('<Errors />', () => {
  describe('when there are no errors', () => {
    it('renders nothing', () => {
      const { container } = mount(<Errors errors={[]} id="errors" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when there are errors', () => {
    it('renders all of them', () => {
      const { container } = mount(<Errors errors={['Some error.', 'Some other error.']} id="errors" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
