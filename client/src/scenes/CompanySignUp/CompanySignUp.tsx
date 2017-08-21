import * as React from 'react';

import * as Button from 'react-bootstrap/lib/Button';

import { Input } from '../../components/Form';
import { ICompanyForCreation } from '../../services/api/companies/types';
import { ICompanySignUpProps, ICompanySignUpState } from './types';
import * as validations from './validations';

class CompanySignUp extends React.Component<ICompanySignUpProps, ICompanySignUpState> {
  public state: ICompanySignUpState = {
    company: {
      name: '',
      slug: '',
    },
    didSubmit: false,
    validations: {
      name: false,
      slug: false,
    },
  };

  public render() {
    return (
      <div>
        <h3>Company Creation</h3>
        <form onSubmit={this.createCompany}>
          <Input
            autoFocus
            label="Company Name"
            onChange={this.handleChange('name')}
            onValidation={this.handleValidation('name')}
            placeholder="Jane's Company"
            serverErrors={this.props.companyCreation.errors.name}
            synchronousValidation={validations.syncNameValidation}
            type="text"
            value={this.state.company.name}
          />
          <Input
            label="URL"
            leftAddonItem="someschedul.es/companies/"
            onChange={this.handleChange('slug')}
            onValidation={this.handleValidation('slug')}
            placeholder="janes-company"
            serverErrors={this.props.companyCreation.errors.slug}
            synchronousValidation={validations.syncSlugValidation}
            type="text"
            value={this.state.company.slug}
          />
          <Button type="submit" disabled={!this.isValid()}>
            Sign Up
          </Button>
        </form>
      </div>
    );
  }

  private handleChange = (attr: keyof ICompanyForCreation) => (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    this.setState((prevState) => ({
      ...prevState,
      company: {
        ...prevState.company,
        [attr]: value,
      },
    }));
  }

  private handleValidation = (attr: keyof ICompanyForCreation) => (isValid: boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      validations: {
        ...prevState.validations,
        [attr]: isValid,
      },
    }));
  }

  private isValid = () => Object.values(this.state.validations).every((value) => value);

  private createCompany = (event) => {
    event.preventDefault();
    this.props.requestCreation(this.state.company);
  }
}

export default CompanySignUp;
