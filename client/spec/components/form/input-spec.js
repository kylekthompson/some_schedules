import React from 'react';
import { Input } from 'components/form';
import { mount } from 'spec/support/mount';

describe('<Input />', () => {
  describe('when it is valid', () => {
    it('is styled correctly', () => {
      const { container } = mount(<Input isValid={true} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when it is not valid', () => {
    it('renders all of them', () => {
      const { container } = mount(<Input isValid={false} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
