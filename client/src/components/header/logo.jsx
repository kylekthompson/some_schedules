import PropTypes from 'prop-types';
import React from 'react';
import { LogoLink } from 'components/header/styled-components';
import { header } from 'models/constants';

export default function Logo({ theme }) {
  return (
    <LogoLink theme={theme} to="/">
      SomeSchedules
    </LogoLink>
  );
}

Logo.propTypes = {
  theme: PropTypes.oneOf([header.DARK_THEME, header.LIGHT_THEME]),
};

Logo.defaultProps = {
  theme: header.LIGHT_THEME,
};
