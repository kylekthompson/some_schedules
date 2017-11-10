import * as React from 'react';

import styled from 'styled-components';

const Button = styled.a`
  font-size: 18px;
  float: right;
  cursor: pointer;
  text-decoration: none;
  color: #333;

  &:hover {
    color: #333;
    text-decoration: none;
  }
`;

const DismissButton = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <Button {...props}>
    &times;
  </Button>
);

export default DismissButton;
