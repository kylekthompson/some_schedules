import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Container, Link } from 'components/style';
import { roles } from 'models/user';

const SidebarContainer = styled(Container)`
  flex: 0;
  min-width: 200px;
`;

export default function Sidebar({ user: { role } }) {
  return (
    <SidebarContainer>
      <Link to="/schedule">Schedule</Link>
      {role === roles.OWNER && <Link to="/company-settings">Company Settings</Link>}
    </SidebarContainer>
  );
}

Sidebar.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.oneOf(Object.values(roles)).isRequired,
  }).isRequired,
};
