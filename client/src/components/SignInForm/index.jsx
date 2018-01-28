import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Form from 'components/Form';
import { forceValidation, handleInputBlur, handleInputChange, initialState } from 'components/SignInForm/state';
import { formValuesFromState } from 'models/form';
import { emailValidator } from 'models/validations/email';
import { passwordValidator } from 'models/validations/password';

const VALIDATIONS = {
  email: emailValidator,
  password: passwordValidator,
};

class SignInForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    validations: PropTypes.object.isRequired,
  };

  static defaultProps = {
    validations: VALIDATIONS,
  };

  state = initialState;

  render() {
    return (
      <Form.Container>
        <Form.HeaderContainer>
          <Form.Title>Sign in</Form.Title>
          <Form.Subtitle>Hi! To start looking at some schedules, go ahead and sign in.</Form.Subtitle>
        </Form.HeaderContainer>
        <Form onSubmit={this.handleSubmit}>
          {this.renderEmailInput()}
          {this.renderPasswordInput()}
          <Form.Submit disabled={this.isSubmitDisabled()}>Sign in</Form.Submit>
        </Form>
      </Form.Container>
    );
  }

  renderEmailInput = () => (
    <Fragment>
      <Form.Label>Email</Form.Label>
      <Form.Input
        autoFocus
        autoComplete="email"
        id="email"
        isValid={this.isValid('email')}
        onBlur={this.handleBlur('email')}
        onChange={this.handleChange('email')}
        placeholder="jane@example.com"
        type="email"
        value={this.value('email')}
      />
      {!this.isValid('email') && <Form.Errors errors={this.errors('email')} />}
    </Fragment>
  )

  renderPasswordInput = () => (
    <Fragment>
      <Form.Label>Password</Form.Label>
      <Form.Input
        autoComplete="current-password"
        id="password"
        isValid={this.isValid('password')}
        placeholder="••••••••"
        onBlur={this.handleBlur('password')}
        onChange={this.handleChange('password')}
        type="password"
        value={this.value('password')}
      />
      {!this.isValid('password') && <Form.Errors errors={this.errors('password')} />}
    </Fragment>
  )

  isValid = (field) => this.state.form[field].errors.length === 0
  isSubmitDisabled = () => Object.keys(this.state.form).some((field) => !this.isValid(field))
  errors = (field) => this.state.form[field].errors
  value = (field) => this.state.form[field].value

  forceValidation = (callback = () => {}) => this.setState(forceValidation(this.props.validations), callback)
  handleBlur = (field) => (event) => this.setState(handleInputBlur(field, this.props.validations, event))
  handleChange = (field) => (event) => this.setState(handleInputChange(field, this.props.validations, event))

  handleSubmit = (event) => {
    event.preventDefault();
    this.forceValidation(() => {
      if (this.isSubmitDisabled()) { return; }
      this.props.onSubmit(formValuesFromState(this.state));
    });
  }
}

export default SignInForm;
