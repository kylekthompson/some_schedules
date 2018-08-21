import React from 'react';
import { Link } from 'src/components/style';
import { css } from 'styled-components';
import { mountWithRouter } from 'spec/support/mount';

describe('<Link />', () => {
  describe('without any props', () => {
    it('is an anchor with padding', () => {
      const { container } = mountWithRouter(<Link to="/foo" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('when passed overrides', () => {
    it('has the overrides', () => {
      const { container } = mountWithRouter(<Link overrides={css`background-color: blue;`} to="/foo" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
