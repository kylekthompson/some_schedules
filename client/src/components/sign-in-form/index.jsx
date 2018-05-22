import Form from 'components/form';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Validator from 'models/validations/validator';
import { emailValidator } from 'models/validations/email';
import {
  forceValidation,
  formValuesFromState,
  handleInputBlur,
  handleInputChange,
  initialFormStateFactory,
} from 'models/form';
import { passwordValidator } from 'models/validations/password';

const FORM_FIELDS = ['email', 'password'];
const VALIDATIONS = {
  email: emailValidator,
  password: passwordValidator,
};

export default class SignInForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    validations: PropTypes.shape({
      email: PropTypes.instanceOf(Validator).isRequired,
      password: PropTypes.instanceOf(Validator).isRequired,
    }),
  };

  static defaultProps = {
    validations: VALIDATIONS,
  };

  state = {
    form: initialFormStateFactory(FORM_FIELDS),
  };

  isValid = (field) => this.state.form[field].errors.length === 0;
  isSubmitDisabled = () =>
    Object.keys(this.state.form).some((field) => !this.isValid(field));
  errors = (field) => this.state.form[field].errors;
  value = (field) => this.state.form[field].value;

  forceValidation = (callback = () => {}) =>
    this.setState(forceValidation(this.props.validations), callback);
  handleBlur = (field) => (event) =>
    this.setState(handleInputBlur(field, this.props.validations, event));
  handleChange = (field) => (event) =>
    this.setState(handleInputChange(field, this.props.validations, event));

  handleSubmit = (event) => {
    event.preventDefault();
    this.forceValidation(() => {
      if (this.isSubmitDisabled()) {
        return;
      }
      this.props.onSubmit(formValuesFromState(this.state));
    });
  };

  renderEmailInput = () => (
    <Fragment>
      <Form.Label>Email</Form.Label>
      <Form.Input
        autoFocus
        autoComplete="email"
        isValid={this.isValid('email')}
        onBlur={this.handleBlur('email')}
        onChange={this.handleChange('email')}
        placeholder="jane@example.com"
        testId="email"
        type="email"
        value={this.value('email')}
      />
      {!this.isValid('email') && <Form.Errors errors={this.errors('email')} />}
    </Fragment>
  );

  renderPasswordInput = () => (
    <Fragment>
      <Form.Label>Password</Form.Label>
      <Form.Input
        autoComplete="current-password"
        isValid={this.isValid('password')}
        placeholder="••••••••"
        onBlur={this.handleBlur('password')}
        onChange={this.handleChange('password')}
        testId="password"
        type="password"
        value={this.value('password')}
      />
      {!this.isValid('password') && (
        <Form.Errors errors={this.errors('password')} />
      )}
    </Fragment>
  );

  render() {
    return (
      <Form.Container>
        <Form.HeaderContainer>
          <Form.Title>Sign in</Form.Title>
          <Form.Subtitle>
            Hi! To start looking at some schedules, go ahead and sign in.
          </Form.Subtitle>
        </Form.HeaderContainer>
        <Form onSubmit={this.handleSubmit}>
          {this.renderEmailInput()}
          {this.renderPasswordInput()}
          <Form.Submit disabled={this.isSubmitDisabled()} value="Sign in" />
        </Form>
      </Form.Container>
    );
  }
}
