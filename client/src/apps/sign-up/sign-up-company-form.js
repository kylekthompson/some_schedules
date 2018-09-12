import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Text } from 'components/style';
import { Errors, Form, Input, Separator } from 'components/form';
import { colors } from 'models/style';
import { debounce } from 'helpers/function';
import { nameValidation } from 'models/validations/company';
import { postCreate } from 'apis/companies';

const FIELDS = [
  {
    initialValue: '',
    name: 'name',
    validation: nameValidation,
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

export default class SignUpCompanyForm extends Component {
  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
  };

  state = {
    isSigningUp: false,
    otherServerErrors: [],
    serverValidationErrors: {},
  };

  signUp = debounce(async (companyParams) => {
    this.setState({
      isSigningUp: true,
    });

    const { company, error, errors } = await postCreate(companyParams);

    if (company) {
      this.setState({
        isSigningUp: false,
      });
      this.props.onSuccess(company);
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
              autoFocus={true}
              placeholder="Company Name"
              type="text"
              {...inputPropsForField('name')}
            />
            <Errors {...errorPropsForField('name')} />
            <Errors errors={this.state.otherServerErrors} />
            <StyledSeparator />
            <StyledButton {...submitProps}>
              <Text color={colors.white()} size={14} weight="demiBold">
                {this.state.isSigningUp ? 'Submitting...' : 'Submit'}
              </Text>
            </StyledButton>
          </>
        )}
      </StyledForm>
    );
  }
}
