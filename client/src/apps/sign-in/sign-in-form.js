import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Text } from 'components/style';
import { Errors, Form, Input, Separator } from 'components/form';
import { colors } from 'models/style';
import { debounce } from 'helpers/function';
import { emailValidation } from 'models/validations/email';
import { passwordValidation } from 'models/validations/password';
import { postSignIn } from 'apis/authentication';

const FIELDS = [
  {
    initialValue: '',
    name: 'email',
    validation: emailValidation,
  },
  {
    initialValue: '',
    name: 'password',
    validation: passwordValidation,
  },
];

const StyledForm = styled(Form)`
  align-items: center;
  width: 300px;
`;

const StyledButton = styled(Button)`
  background-color: ${colors.rackleyBlue()};
  padding: 8px;
  width: 100%;

  &:disabled {
    background-color: ${colors.graniteGray(.25)};
  }
`;

const StyledSeparator = styled(Separator)`
  margin-top: 0;
`;

export default class SignInForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    errors: [],
  };

  signIn = debounce(async (authentication) => {
    const { context, status } = await postSignIn(authentication);

    if (status !== 401) {
      this.props.onSubmit(context);
    } else {
      this.setState({
        errors: ['It looks like there was an issue with your email or password.'],
      });
    }
  });

  render() {
    return (
      <StyledForm
        fields={FIELDS}
        onSubmit={this.signIn}
      >
        {({ errorPropsForField, inputPropsForField, submitProps }) => (
          <>
            <Input
              autoComplete="email"
              autoFocus={true}
              placeholder="Email"
              type="email"
              {...inputPropsForField('email')}
            />
            <Errors {...errorPropsForField('email')} />
            <Input
              autoComplete="current-password"
              placeholder="Password"
              type="password"
              {...inputPropsForField('password')}
            />
            <Errors {...errorPropsForField('password')} />
            <Errors errors={this.state.errors} />
            <StyledSeparator />
            <StyledButton {...submitProps}>
              <Text color={colors.white()} size={14} weight="demiBold">
                Submit
              </Text>
            </StyledButton>
          </>
        )}
      </StyledForm>
    );
  }
}
