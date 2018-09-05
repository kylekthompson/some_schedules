import Container from 'src/components/style/container';
import styled from 'styled-components';
import { colors, shadows } from 'src/models/style';

export default styled(Container)`
  ${shadows.normal}
  background-color: ${colors.white()};
  border-radius: 4px;
  padding: 10px;
`;
