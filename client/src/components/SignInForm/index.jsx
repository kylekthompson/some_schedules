import React, { Component, Fragment } from 'react';

import Form from 'components/Form';
import { handleInputBlur, handleInputChange, initialState } from 'components/SignInForm/state';

class SignInForm extends Component {
  state = initialState;

  get formValues() {
    return Object.keys(this.state.form).reduce((values, field) => ({
      ...values,
      [field]: this.state.form[field].value,
    }), {});
  }

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
        onChange={this.handleChange('email')}
        placeholder="jane@example.com"
        type="email"
        isValid={this.isValid('email')}
        value={this.state.form.email.value}
      />
    </Fragment>
  )

  renderPasswordInput = () => (
    <Fragment>
      <Form.Label>Password</Form.Label>
      <Form.Input
        autoComplete="current-password"
        placeholder="••••••••"
        onChange={this.handleChange('password')}
        type="password"
        isValid={this.isValid('password')}
        value={this.state.form.password.value}
      />
    </Fragment>
  )

  isValid = (field) => this.state.form[field].errors.length === 0
  isSubmitDisabled = () => Object.keys(this.state.form).some((field) => !this.isValid(field))

  handleBlur = (field) => (event) => this.setState(handleInputBlur)
  handleChange = (field) => (event) => this.setState(handleInputChange(field, event))

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.formValues);
  }
}

export default SignInForm;
