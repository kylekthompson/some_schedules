import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'models/style';
import { memoize } from 'helpers/function';

const getTextComponent = memoize(function (component) {
  return styled(component)`
    ${({ weight = 'regular' }) => fonts[weight]}
    ${({ size = 12 }) => css`font-size: ${size}px;`}
    ${({ color = colors.eerieBlack() }) => css`color: ${color};`}
  `;
});

export default function Text({ component, ...rest }) {
  const TextComponent = getTextComponent(component);
  return <TextComponent {...rest} />;
}

Text.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

Text.defaultProps = {
  component: 'p',
};
