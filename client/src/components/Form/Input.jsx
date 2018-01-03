import React from 'react';

import PropTypes from 'prop-types';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import InputGroup from 'react-bootstrap/lib/InputGroup';

class Input extends React.Component {
  static propTypes = {
    asynchronousValidation: PropTypes.func,
    label: PropTypes.string,
    leftAddonItem: PropTypes.node,
    onChange: PropTypes.func.isRequired,
    onValidation: PropTypes.func.isRequired,
    rightAddonItem: PropTypes.node,
    serverErrors: PropTypes.arrayOf(PropTypes.string),
    synchronousValidation: PropTypes.func,
  };

  state = {
    asyncValidationErrors: [],
    isPristine: true,
    isShowingServerErrors: true,
    syncValidationErrors: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const shouldReport =
      prevProps.serverErrors !== this.props.serverErrors ||
      prevState.syncValidationErrors !== this.state.syncValidationErrors ||
      prevState.asyncValidationErrors !== this.state.asyncValidationErrors ||
      (!this.props.synchronousValidation && !this.props.asynchronousValidation);

    if (shouldReport) {
      this.reportValidation();
    }

    if (prevProps.serverErrors !== this.props.serverErrors) {
      this.setState({
        isShowingServerErrors: true,
      });
    }
  }

  render() {
    const { label } = this.props;

    return (
      <FormGroup
        validationState={this.validationState()}
      >
        {label && <ControlLabel>{label}</ControlLabel>}
        {this.renderFormControl()}
        {this.renderFeedback()}
        {this.renderHelpBlock()}
      </FormGroup>
    );
  }

  handleBlur = async (event) => {
    this.stopShowingServerErrors();
    this.setDirtyState();

    this.setState((prevState) => ({
      ...prevState,
      asyncValidationErrors: ['Validating...'],
    }));

    const value = event.currentTarget.value;
    const asyncErrors = this.props.asynchronousValidation && await this.props.asynchronousValidation(value);
    const syncErrors = this.props.synchronousValidation && this.props.synchronousValidation(value);

    this.setState((prevState) => ({
      ...prevState,
      asyncValidationErrors: (asyncErrors || []),
      syncValidationErrors: (syncErrors || []),
    }));
  }

  handleChange = (event) => {
    this.stopShowingServerErrors();
    this.setDirtyState();
    this.props.onChange(event);

    if (!this.props.synchronousValidation) { return; }

    const value = event.currentTarget.value;
    const syncErrors = this.props.synchronousValidation(value);

    this.setState((prevState) => ({
      ...prevState,
      syncValidationErrors: (syncErrors || []),
    }));
  }

  renderFeedback = () => (
    !this.state.isPristine && <FormControl.Feedback />
  )

  renderHelpBlock = () => {
    const errors = [
      ...this.state.asyncValidationErrors,
      ...this.state.syncValidationErrors,
    ];

    if (this.state.isShowingServerErrors) {
      errors.push(...(this.props.serverErrors || []));
    }

    if (this.state.isPristine || errors.length === 0) { return null; }

    return (
      <HelpBlock>
        {errors.map((error, index) => <p key={index}>{error}</p>)}
      </HelpBlock>
    );
  }

  renderFormControl = () => {
    const {
      asynchronousValidation,
      label,
      leftAddonItem,
      onBlur,
      onChange,
      onValidation,
      rightAddonItem,
      serverErrors,
      synchronousValidation,
      ...rest,
    } = this.props;

    if (leftAddonItem || rightAddonItem) {
      return (
        <InputGroup>
          {leftAddonItem && <InputGroup.Addon>{leftAddonItem}</InputGroup.Addon>}
          <FormControl
            {...rest}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
          />
          {rightAddonItem && <InputGroup.Addon>{rightAddonItem}</InputGroup.Addon>}
        </InputGroup>
      );
    }

    return (
      <FormControl
        {...rest}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
    );
  }

  reportValidation = () => {
    const errors = [
      ...this.state.asyncValidationErrors,
      ...this.state.syncValidationErrors,
    ];

    this.props.onValidation(/* isValid */ errors.length === 0);
  }

  setDirtyState = () => {
    if (this.state.isPristine) {
      this.setState({
        isPristine: false,
      });
    }
  }

  stopShowingServerErrors = () => {
    if (this.state.isShowingServerErrors) {
      this.setState({
        isShowingServerErrors: false,
      });
    }
  }

  validationState = () => {
    if (this.state.isPristine) { return null; }

    const errors = [
      ...this.state.asyncValidationErrors,
      ...this.state.syncValidationErrors,
    ];

    if (this.state.isShowingServerErrors) {
      errors.push(...(this.props.serverErrors || []));
    }

    return errors.length > 0 ? 'error' : 'success';
  }
}

export default Input;
