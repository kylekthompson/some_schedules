import React, { Component } from 'react';

import styled from 'styled-components';

import { colors } from 'models/constants';
import { fonts } from 'models/styles';

class Submit extends Component {
  render() {
    const { onClick, ...rest } = this.props;
    return <button onClick={this.handleClick} type="submit" {...rest} />;
  }

  handleClick = (event) => {
    event.target.blur();
    this.props.onClick && this.props.onClick(event);
  }
}

export default styled(Submit)`
  ${fonts.regular}
  background-color: ${colors.white(0.0)};
  border: 1px solid ${colors.white(0.25)};
  border-radius: 2px;
  box-shadow: none;
  color: ${colors.white()};
  font-size: 14px;
  margin-top: 30px;
  padding: 5px;

  &:focus,
  &:hover {
    background-color: ${colors.white(0.01)};
    box-shadow: 1px 1px 4px ${colors.black(0.2)};
    cursor: pointer;
    outline: none;
  }

  &:active {
    box-shadow: 3px 3px 12px ${colors.black(0.2)};
    outline: none;
  }

  &:disabled {
    background-color: ${colors.white(0.05)};
    border: none;
    box-shadow: none;
    color: ${colors.white(0.25)};
    cursor: auto;
    outline: none;
  }

  &::placeholder {
    color: ${colors.white(0.5)};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    ${'' /* this is a gross hack to remove the yellow autofill background color */}
    transition: color 9999s ease-out, background-color 9999s ease-out;
  }
`;
