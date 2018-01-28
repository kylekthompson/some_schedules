import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Form from 'components/Form';
import { forceValidation, handleInputBlur, handleInputChange, initialState } from 'components/SignUpForm/state';
import { formValuesFromState } from 'models/form';
import { nameValidator, slugValidator } from 'models/validations/company';
import { emailValidator } from 'models/validations/email';
import { firstNameValidator, lastNameValidator } from 'models/validations/user';
import { passwordValidator, passwordConfirmationValidator } from 'models/validations/password';

const VALIDATIONS = {
  email: emailValidator,
  firstName: firstNameValidator,
  lastName: lastNameValidator,
  name: nameValidator,
  password: passwordValidator,
  passwordConfirmation: passwordConfirmationValidator,
  slug: slugValidator,
};

class SignUpForm extends Component {
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
          <Form.Title>Sign up</Form.Title>
          <Form.Subtitle>Hi! By signing up, you'll be able to schedule your employees faster than ever before. Give us a shot!</Form.Subtitle>
        </Form.HeaderContainer>
        <Form onSubmit={this.handleSubmit}>
          {this.renderCompanyNameInput()}
          {this.renderCompanySlugInput()}
          {this.renderFirstNameInput()}
          {this.renderLastNameInput()}
          {this.renderEmailInput()}
          {this.renderPasswordInput()}
          {this.renderPasswordConfirmationInput()}
          <Form.Submit disabled={this.isSubmitDisabled()}>Sign up</Form.Submit>
        </Form>
      </Form.Container>
    );
  }

  renderCompanyNameInput = () => (
    <Fragment>
      <Form.Label>Company Name</Form.Label>
      <Form.Input
        autoFocus
        id="company-name"
        isValid={this.isValid('name')}
        onBlur={this.handleBlur('name')}
        onChange={this.handleChange('name')}
        placeholder="Jane's Company"
        type="text"
        value={this.value('name')}
      />
      {!this.isValid('name') && <Form.Errors errors={this.errors('name')} />}
    </Fragment>
  )

  renderCompanySlugInput = () => (
    <Fragment>
      <Form.Label>Company Identifier</Form.Label>
      <Form.Input
        id="company-slug"
        isValid={this.isValid('slug')}
        onBlur={this.handleBlur('slug')}
        onChange={this.handleChange('slug')}
        placeholder="janes-company"
        type="text"
        value={this.value('slug')}
      />
      {!this.isValid('slug') && <Form.Errors errors={this.errors('slug')} />}
    </Fragment>
  )

  renderFirstNameInput = () => (
    <Fragment>
      <Form.Label>First Name</Form.Label>
      <Form.Input
        autoComplete="given-name"
        id="user-first-name"
        isValid={this.isValid('firstName')}
        onBlur={this.handleBlur('firstName')}
        onChange={this.handleChange('firstName')}
        placeholder="Jane"
        type="text"
        value={this.value('firstName')}
      />
      {!this.isValid('firstName') && <Form.Errors errors={this.errors('firstName')} />}
    </Fragment>
  )

  renderLastNameInput = () => (
    <Fragment>
      <Form.Label>Last Name</Form.Label>
      <Form.Input
        autoComplete="family-name"
        id="user-last-name"
        isValid={this.isValid('lastName')}
        onBlur={this.handleBlur('lastName')}
        onChange={this.handleChange('lastName')}
        placeholder="Smith"
        type="text"
        value={this.value('lastName')}
      />
      {!this.isValid('lastName') && <Form.Errors errors={this.errors('lastName')} />}
    </Fragment>
  )

  renderEmailInput = () => (
    <Fragment>
      <Form.Label>Email</Form.Label>
      <Form.Input
        autoComplete="email"
        id="user-email"
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
        autoComplete="new-password"
        id="user-password"
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

  renderPasswordConfirmationInput = () => (
    <Fragment>
      <Form.Label>Password Confirmation</Form.Label>
      <Form.Input
        autoComplete="new-password"
        id="user-password-confirmation"
        isValid={this.isValid('passwordConfirmation')}
        placeholder="••••••••"
        onBlur={this.handleBlur('passwordConfirmation')}
        onChange={this.handleChange('passwordConfirmation')}
        type="password"
        value={this.value('passwordConfirmation')}
      />
      {!this.isValid('passwordConfirmation') && <Form.Errors errors={this.errors('passwordConfirmation')} />}
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

export default SignUpForm;
