import Container from 'components/style/container';
import styled from 'styled-components';
import { colors, shadows } from 'models/style';

export default styled(Container)`
  ${shadows.containers.normal}
  background-color: ${colors.white()};
  border-radius: 4px;
  padding: 10px;
`;
