import Form from 'components/form';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Validator from 'models/validations/validator';
import { emailValidator } from 'models/validations/email';
import { firstNameValidator, lastNameValidator } from 'models/validations/user';
import {
  forceValidation,
  formValuesFromState,
  handleInputBlur,
  handleInputChange,
  initialFormStateFactory,
} from 'models/form';
import { nameValidator, slugValidator } from 'models/validations/company';
import {
  passwordValidator,
  passwordConfirmationValidator,
} from 'models/validations/password';

const FORM_FIELDS = [
  'name',
  'slug',
  'firstName',
  'lastName',
  'email',
  'password',
  'passwordConfirmation',
];
const VALIDATIONS = {
  email: emailValidator,
  firstName: firstNameValidator,
  lastName: lastNameValidator,
  name: nameValidator,
  password: passwordValidator,
  passwordConfirmation: passwordConfirmationValidator,
  slug: slugValidator,
};

export default class SignUpForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    validations: PropTypes.shape({
      email: PropTypes.instanceOf(Validator).isRequired,
      firstName: PropTypes.instanceOf(Validator).isRequired,
      lastName: PropTypes.instanceOf(Validator).isRequired,
      name: PropTypes.instanceOf(Validator).isRequired,
      password: PropTypes.instanceOf(Validator).isRequired,
      passwordConfirmation: PropTypes.instanceOf(Validator).isRequired,
      slug: PropTypes.instanceOf(Validator).isRequired,
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

  renderCompanyNameInput = () => (
    <Fragment>
      <Form.Label>Company Name</Form.Label>
      <Form.Input
        autoFocus
        isValid={this.isValid('name')}
        onBlur={this.handleBlur('name')}
        onChange={this.handleChange('name')}
        placeholder="Jane's Company"
        testId="company-name"
        type="text"
        value={this.value('name')}
      />
      {!this.isValid('name') && <Form.Errors errors={this.errors('name')} />}
    </Fragment>
  );

  renderCompanySlugInput = () => (
    <Fragment>
      <Form.Label>Company Identifier</Form.Label>
      <Form.Input
        isValid={this.isValid('slug')}
        onBlur={this.handleBlur('slug')}
        onChange={this.handleChange('slug')}
        placeholder="janes-company"
        testId="company-slug"
        type="text"
        value={this.value('slug')}
      />
      {!this.isValid('slug') && <Form.Errors errors={this.errors('slug')} />}
    </Fragment>
  );

  renderFirstNameInput = () => (
    <Fragment>
      <Form.Label>First Name</Form.Label>
      <Form.Input
        autoComplete="given-name"
        isValid={this.isValid('firstName')}
        onBlur={this.handleBlur('firstName')}
        onChange={this.handleChange('firstName')}
        placeholder="Jane"
        testId="user-first-name"
        type="text"
        value={this.value('firstName')}
      />
      {!this.isValid('firstName') && (
        <Form.Errors errors={this.errors('firstName')} />
      )}
    </Fragment>
  );

  renderLastNameInput = () => (
    <Fragment>
      <Form.Label>Last Name</Form.Label>
      <Form.Input
        autoComplete="family-name"
        isValid={this.isValid('lastName')}
        onBlur={this.handleBlur('lastName')}
        onChange={this.handleChange('lastName')}
        placeholder="Smith"
        testId="user-last-name"
        type="text"
        value={this.value('lastName')}
      />
      {!this.isValid('lastName') && (
        <Form.Errors errors={this.errors('lastName')} />
      )}
    </Fragment>
  );

  renderEmailInput = () => (
    <Fragment>
      <Form.Label>Email</Form.Label>
      <Form.Input
        autoComplete="email"
        isValid={this.isValid('email')}
        onBlur={this.handleBlur('email')}
        onChange={this.handleChange('email')}
        placeholder="jane@example.com"
        testId="user-email"
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
        autoComplete="new-password"
        isValid={this.isValid('password')}
        placeholder="••••••••"
        onBlur={this.handleBlur('password')}
        onChange={this.handleChange('password')}
        testId="user-password"
        type="password"
        value={this.value('password')}
      />
      {!this.isValid('password') && (
        <Form.Errors errors={this.errors('password')} />
      )}
    </Fragment>
  );

  renderPasswordConfirmationInput = () => (
    <Fragment>
      <Form.Label>Password Confirmation</Form.Label>
      <Form.Input
        autoComplete="new-password"
        isValid={this.isValid('passwordConfirmation')}
        placeholder="••••••••"
        onBlur={this.handleBlur('passwordConfirmation')}
        onChange={this.handleChange('passwordConfirmation')}
        testId="user-password-confirmation"
        type="password"
        value={this.value('passwordConfirmation')}
      />
      {!this.isValid('passwordConfirmation') && (
        <Form.Errors errors={this.errors('passwordConfirmation')} />
      )}
    </Fragment>
  );

  render() {
    return (
      <Form.Container>
        <Form.HeaderContainer>
          <Form.Title>Sign up</Form.Title>
          <Form.Subtitle>
            {
              "Hi! By signing up, you'll be able to schedule your employees faster than ever before. Give us a shot!"
            }
          </Form.Subtitle>
        </Form.HeaderContainer>
        <Form onSubmit={this.handleSubmit}>
          {this.renderCompanyNameInput()}
          {this.renderCompanySlugInput()}
          {this.renderFirstNameInput()}
          {this.renderLastNameInput()}
          {this.renderEmailInput()}
          {this.renderPasswordInput()}
          {this.renderPasswordConfirmationInput()}
          <Form.Submit disabled={this.isSubmitDisabled()} value="Sign up" />
        </Form>
      </Form.Container>
    );
  }
}
