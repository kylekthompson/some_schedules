import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
    })).isRequired,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit: () => {},
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
    return this.props.fields.some(({ name }) => this.state[name].errors.length > 0);
  }

  errorPropsForField = (field) => ({
    errors: this.formErrors()[field],
  });

  inputPropsForField = (field) => ({
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
      const isDirty = state[field].didBlur || Boolean(value);
      let errors = [];

      if (isDirty) {
        errors = this.props.fields.find(({ name }) => name === field).validations.run({
          ...this.formValues(state),
          [field]: value,
        });
      }

      state[field].didBlur = isDirty;
      state[field].errors = errors;
      state[field].isDirty = true;
      state[field].value = value;
    }));
  });

  handleChange = memoize((field) => (event) => {
    const { value } = event.currentTarget;

    this.setState(produce((state) => {
      let errors = [];

      if (state[field].didBlur && state[field].isDirty) {
        errors = this.props.fields.find(({ name }) => name === field).validations.run({
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
        state[field.name].didBlur = true;
        state[field.name].errors = field.validations.run(this.formValues(state));
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
