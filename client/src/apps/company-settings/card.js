import styled from 'styled-components';
import { Card } from 'components/style';

export default styled(Card)`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
