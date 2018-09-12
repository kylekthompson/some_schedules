import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Validation from 'models/validations/validation';
import produce from 'immer';
import styled from 'styled-components';
import { memoize } from 'helpers/function';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default class Form extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    className: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.shape({
      initialValue: PropTypes.any,
      name: PropTypes.string.isRequired,
      validation: PropTypes.instanceOf(Validation),
    })).isRequired,
    isSubmitting: PropTypes.bool,
    onSubmit: PropTypes.func,
    serverErrors: PropTypes.object,
  };

  static defaultProps = {
    onSubmit: () => {},
    serverErrors: {},
  };

  state = this.props.fields.reduce((state, field) => ({
    ...state,
    [field.name]: {
      didBlur: false,
      errors: [],
      isDirty: false,
      value: field.initialValue || '',
    },
  }), {});

  get renderProps() {
    return {
      errorPropsForField: this.errorPropsForField,
      inputPropsForField: this.inputPropsForField,
      submitProps: this.submitProps,
    };
  }

  get submitProps() {
    return {
      disabled: this.isSubmitDisabled,
    };
  }

  get isSubmitDisabled() {
    return this.props.isSubmitting || this.props.fields.some(({ name }) => this.state[name].errors.length > 0);
  }

  errorPropsForField = (field) => ({
    errors: [...this.formErrors()[field], ...(this.props.serverErrors[field] || [])],
  });

  inputPropsForField = (field) => ({
    isValid: this.formErrors()[field].length === 0,
    onBlur: this.handleBlur(field),
    onChange: this.handleChange(field),
    value: this.formValues()[field],
  });

  pluckFormField = (formField) => (state = this.state) => this.props.fields.reduce((values, field) => ({
    ...values,
    [field.name]: state[field.name][formField],
  }), {});
  formValues = this.pluckFormField('value');
  formErrors = this.pluckFormField('errors');

  handleBlur = memoize((field) => (event) => {
    const { value } = event.currentTarget;

    this.setState(produce((state) => {
      const validation = this.props.fields.find(({ name }) => name === field).validation;
      let errors = [];

      if (validation) {
        errors = validation.run({
          ...this.formValues(state),
          [field]: value,
        });
      }

      state[field].didBlur = true;
      state[field].errors = errors;
      state[field].isDirty = true;
      state[field].value = value;
    }));
  });

  handleChange = memoize((field) => (event) => {
    const { value } = event.currentTarget;

    this.setState(produce((state) => {
      const validation = this.props.fields.find(({ name }) => name === field).validation;
      let errors = [];

      if (state[field].didBlur && state[field].isDirty && validation) {
        errors = validation.run({
          ...this.formValues(state),
          [field]: value,
        });
      }

      state[field].errors = errors;
      state[field].isDirty = true;
      state[field].value = value;
    }));
  });

  forceValidation = (callback) => {
    this.setState(produce((state) => {
      this.props.fields.forEach((field) => {
        let errors = [];

        if (field.validation) {
          errors = field.validation.run(this.formValues(state));
        }

        state[field.name].didBlur = true;
        state[field.name].errors = errors;
        state[field.name].isDirty = true;
      });
    }), callback);
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.forceValidation(() => {
      if (this.isSubmitDisabled) {
        return;
      }

      this.props.onSubmit(this.formValues());
    });
  };

  render() {
    return (
      <StyledForm className={this.props.className} onSubmit={this.handleSubmit}>
        {this.props.children(this.renderProps)}
      </StyledForm>
    );
  }
}
