import * as React from 'react';

import * as Button from 'react-bootstrap/lib/Button';

import { Link, Redirect } from 'react-router-dom';

import { Input } from '../../components/Form';
import { ICompanyForCreation } from '../../services/api/companies/types';
import { IUserForCreation } from '../../services/api/users/types';
import { signUp } from '../../services/graphql/mutations/signUp';
import { ISignUpProps, ISignUpState } from './types';
import * as validations from './validations';

class SignUp extends React.Component<ISignUpProps, ISignUpState> {
  public static defaultProps: Partial<ISignUpProps> = {
    shouldRedirectWhenSignedIn: true,
  };
  public state: ISignUpState = {
    company: {
      name: '',
      slug: '',
    },
    companyErrors: {},
    didSubmit: false,
    errors: {},
    user: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
    },
    userErrors: {},
    validations: {
      company: {
        name: false,
        slug: false,
      },
      user: {
        email: false,
        firstName: false,
        lastName: false,
        password: false,
        passwordConfirmation: false,
      },
    },
  };

  public render() {
    if (this.props.isSignedIn) { return <Redirect to={`/companies/${this.state.company.slug}`} />; }

    return (
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={this.signUp}>
          <Input
            autoFocus
            autoComplete="given-name"
            label="First Name"
            onChange={this.handleChange('user', 'firstName')}
            onValidation={this.handleValidation('user', 'firstName')}
            placeholder="Jane"
            serverErrors={this.state.userErrors.firstName}
            synchronousValidation={validations.syncFirstNameValidation}
            type="text"
            value={this.state.user.firstName}
          />
          <Input
            autoComplete="family-name"
            label="Last Name"
            onChange={this.handleChange('user', 'lastName')}
            onValidation={this.handleValidation('user', 'lastName')}
            placeholder="Smith"
            serverErrors={this.state.userErrors.lastName}
            synchronousValidation={validations.syncLastNameValidation}
            type="text"
            value={this.state.user.lastName}
          />
          <Input
            autoComplete="email"
            label="Email Address"
            onChange={this.handleChange('user', 'email')}
            onValidation={this.handleValidation('user', 'email')}
            placeholder="jane@example.com"
            serverErrors={this.state.userErrors.email}
            synchronousValidation={validations.syncEmailValidation}
            type="email"
            value={this.state.user.email}
          />
          <Input
            autoComplete="new-password"
            label="Password"
            onChange={this.handleChange('user', 'password')}
            onValidation={this.handleValidation('user', 'password')}
            serverErrors={this.state.userErrors.password}
            synchronousValidation={validations.syncPasswordValidation}
            type="password"
            value={this.state.user.password}
          />
          <Input
            autoComplete="new-password"
            label="Password Confirmation"
            onChange={this.handleChange('user', 'passwordConfirmation')}
            onValidation={this.handleValidation('user', 'passwordConfirmation')}
            serverErrors={this.state.userErrors.passwordConfirmation}
            synchronousValidation={validations.syncPasswordComfirmationValidation(this.state.user.password)}
            type="password"
            value={this.state.user.passwordConfirmation}
          />
          <Input
            label="Company Name"
            onChange={this.handleChange('company', 'name')}
            onValidation={this.handleValidation('company', 'name')}
            placeholder="Jane's Company"
            serverErrors={this.state.companyErrors.name}
            synchronousValidation={validations.syncNameValidation}
            type="text"
            value={this.state.company.name}
          />
          <Input
            label="URL"
            leftAddonItem="someschedul.es/companies/"
            onChange={this.handleChange('company', 'slug')}
            onValidation={this.handleValidation('company', 'slug')}
            placeholder="janes-company"
            serverErrors={this.state.companyErrors.slug}
            synchronousValidation={validations.syncSlugValidation}
            type="text"
            value={this.state.company.slug}
          />
          <Button type="submit" disabled={!this.isValid() || this.state.didSubmit}>
            Sign Up
          </Button>
          <p>Already have an account? <Link to="/sign-in">Click here to sign in</Link></p>
        </form>
      </div>
    );
  }

  private handleChange = (
    object: 'user' | 'company',
    attr: keyof IUserForCreation | keyof ICompanyForCreation
  ) => (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    this.setState((prevState) => ({
      ...prevState,
      [object]: {
        ...prevState[object],
        [attr]: value,
      },
    }));
  }

  private handleValidation = (
    object: 'user' | 'company',
    attr: keyof IUserForCreation | keyof ICompanyForCreation
  ) => (isValid: boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        [object]: {
          ...prevState.validations[object],
          [attr]: isValid,
        },
      },
    }));
  }

  private isValid = () =>
    Object.values(this.state.validations.user).every((isValid) => isValid) &&
    Object.values(this.state.validations.company).every((isValid) => isValid)

  private signUp = (event) => {
    event.preventDefault();

    this.setState({
      didSubmit: true,
      errors: {},
    });

    signUp({ company: this.state.company, user: this.state.user }).then(({
      data: {
        signUp: {
          companyErrors,
          errors,
          userErrors,
          token,
        },
      },
    }) => {
      if (token) {
        this.props.persistSignIn(token);
      } else if (companyErrors || errors || userErrors) {
        this.setState({
          companyErrors: companyErrors || {},
          didSubmit: false,
          errors: errors || {},
          userErrors: userErrors || {},
        });
      } else {
        this.setState({
          didSubmit: false,
        });
      }
    }).catch(() => {
      this.setState({
        didSubmit: false,
      });
    });
  }
}

export default SignUp;
