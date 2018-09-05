import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Button, Text } from 'src/components/style';
import { Errors, Form, Input, Separator } from 'src/components/form';
import { colors } from 'src/models/style';
import { emailValidation } from 'src/models/validations/email';
import { passwordValidation } from 'src/models/validations/password';

const FIELDS = [
  {
    initialValue: '',
    name: 'email',
    validations: emailValidation,
  },
  {
    initialValue: '',
    name: 'password',
    validations: passwordValidation,
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

export default function SignInForm() {
  return (
    <StyledForm
      fields={FIELDS}
      onSubmit={console.log}
    >
      {({ errorPropsForField, inputPropsForField, submitProps }) => (
        <Fragment>
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
          <StyledSeparator />
          <StyledButton {...submitProps}>
            <Text color={colors.white()} size={14} weight="demiBold">
              Submit
            </Text>
          </StyledButton>
        </Fragment>
      )}
    </StyledForm>
  );
}
