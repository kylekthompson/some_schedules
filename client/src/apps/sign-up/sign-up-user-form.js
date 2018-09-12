import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Text } from 'components/style';
import { Errors, Form, Input, Separator } from 'components/form';
import { colors } from 'models/style';
import { debounce } from 'helpers/function';
import { emailValidation } from 'models/validations/email';
import { firstNameValidation, lastNameValidation } from 'models/validations/user';
import { passwordConfirmationValidation, passwordValidation } from 'models/validations/password';
import { postCreate } from 'apis/users';

const FIELDS = [
  {
    initialValue: '',
    name: 'firstName',
    validation: firstNameValidation,
  },
  {
    initialValue: '',
    name: 'lastName',
    validation: lastNameValidation,
  },
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
  {
    initialValue: '',
    name: 'passwordConfirmation',
    validation: passwordConfirmationValidation,
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

export default class SignUpUserForm extends Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
  };

  state = {
    isSigningUp: false,
    otherServerErrors: [],
    serverValidationErrors: {},
  };

  signUp = debounce(async (userParams) => {
    this.setState({
      isSigningUp: true,
    });

    const { error, errors, user } = await postCreate(userParams);

    if (user) {
      this.setState({
        isSigningUp: false,
      });
      this.props.onSuccess(user);
    } else if (errors) {
      this.setState({
        isSigningUp: false,
        serverValidationErrors: errors,
      });
    } else {
      this.setState({
        isSigningUp: false,
        otherServerErrors: [error],
      });
    }
  });

  render() {
    return (
      <StyledForm
        fields={FIELDS}
        isSubmitting={this.state.isSigningUp}
        onSubmit={this.signUp}
        serverErrors={this.state.serverValidationErrors}
      >
        {({ errorPropsForField, inputPropsForField, submitProps }) => (
          <>
            <Input
              autoComplete="given-name"
              autoFocus={true}
              placeholder="First Name"
              type="text"
              {...inputPropsForField('firstName')}
            />
            <Errors {...errorPropsForField('firstName')} />
            <Input
              autoComplete="family-name"
              placeholder="Last Name"
              type="text"
              {...inputPropsForField('lastName')}
            />
            <Errors {...errorPropsForField('lastName')} />
            <Input
              autoComplete="email"
              placeholder="Email"
              type="email"
              {...inputPropsForField('email')}
            />
            <Errors {...errorPropsForField('email')} />
            <Input
              autoComplete="new-password"
              placeholder="Password"
              type="password"
              {...inputPropsForField('password')}
            />
            <Errors {...errorPropsForField('password')} />
            <Input
              autoComplete="new-password"
              placeholder="Password Confirmation"
              type="password"
              {...inputPropsForField('passwordConfirmation')}
            />
            <Errors {...errorPropsForField('passwordConfirmation')} />
            <Errors errors={this.state.otherServerErrors} />
            <StyledSeparator />
            <StyledButton {...submitProps}>
              <Text color={colors.white()} size={14} weight="demiBold">
                {this.state.isSigningUp ? 'Submitting...' : 'Next'}
              </Text>
            </StyledButton>
          </>
        )}
      </StyledForm>
    );
  }
}
