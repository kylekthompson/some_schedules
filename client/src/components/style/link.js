import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export default styled(Link)`
  padding: 5px 15px;
  ${({ overrides = css`` }) => overrides}
`;
