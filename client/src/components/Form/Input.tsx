import * as React from 'react';

import * as ControlLabel from 'react-bootstrap/lib/ControlLabel';
import * as FormControl from 'react-bootstrap/lib/FormControl';
import * as FormGroup from 'react-bootstrap/lib/FormGroup';
import * as HelpBlock from 'react-bootstrap/lib/HelpBlock';

import { IInputProps, IInputState } from './types';

class Form extends React.Component<IInputProps, IInputState> {
  public state: IInputState = {
    asyncValidationErrors: [],
    isPristine: true,
    isShowingServerErrors: true,
    syncValidationErrors: [],
  };

  public componentDidUpdate(prevProps: IInputProps, prevState: IInputState) {
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

  public render() {
    const {
      asynchronousValidation,
      label,
      serverErrors,
      synchronousValidation,
      onBlur,
      onChange,
      onValidation,
      ...rest,
    } = this.props;

    return (
      <FormGroup
        validationState={this.validationState()}
      >
        {label && <ControlLabel>{label}</ControlLabel>}
        <FormControl
          {...rest}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        {this.renderFeedback()}
        {this.renderHelpBlock()}
      </FormGroup>
    );
  }

  private handleBlur = async (event: React.FormEvent<HTMLInputElement>): Promise<void> => {
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

  private handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
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

  private renderFeedback = () => (
    !this.state.isPristine && <FormControl.Feedback />
  )

  private renderHelpBlock = () => {
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

  private reportValidation = () => {
    const errors = [
      ...this.state.asyncValidationErrors,
      ...this.state.syncValidationErrors,
    ];

    this.props.onValidation(/* isValid */ errors.length === 0);
  }

  private setDirtyState = () => {
    if (this.state.isPristine) {
      this.setState({
        isPristine: false,
      });
    }
  }

  private stopShowingServerErrors = () => {
    if (this.state.isShowingServerErrors) {
      this.setState({
        isShowingServerErrors: false,
      });
    }
  }

  private validationState = () => {
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

export default Form;
