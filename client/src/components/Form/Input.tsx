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
    syncValidationErrors: [],
  };

  public componentDidUpdate(_prevProps: IInputProps, prevState: IInputState) {
    const shouldReport =
      prevState.syncValidationErrors !== this.state.syncValidationErrors ||
      prevState.asyncValidationErrors !== this.state.asyncValidationErrors ||
      (!this.props.synchronousValidation && !this.props.asynchronousValidation);

    if (shouldReport) {
      this.reportValidation();
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
    const value = event.currentTarget.value;
    if (!this.props.asynchronousValidation) { return; }
    this.setState((prevState) => ({
      ...prevState,
      asyncValidationErrors: ['Validating...'],
    }));

    const asyncErrors = await this.props.asynchronousValidation(value);

    this.setState((prevState) => ({
      ...prevState,
      asyncValidationErrors: asyncErrors,
    }));
  }

  private handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const value = event.currentTarget.value;

    this.props.onChange(event);

    if (this.state.isPristine) {
      this.setState({
        isPristine: false,
      });
    }

    if (!this.props.synchronousValidation) { return; }
    const syncErrors = this.props.synchronousValidation(value);
    this.setState((prevState) => ({
      ...prevState,
      syncValidationErrors: syncErrors,
    }));
  }

  private renderFeedback = () => (
    !this.state.isPristine && <FormControl.Feedback />
  )

  private renderHelpBlock = () => {
    const errors = [
      ...this.state.asyncValidationErrors,
      ...this.state.syncValidationErrors,
      ...(this.props.serverErrors || []),
    ];

    if (this.state.isPristine || errors.length === 0) { return null; }

    return (
      <HelpBlock>
        {errors.map((error, index) => <p key={index}>{error}</p>)}
      </HelpBlock>
    );
  }

  private reportValidation = () => {
    const errors = [...this.state.asyncValidationErrors, ...this.state.syncValidationErrors];
    this.props.onValidation(/* isValid */ errors.length === 0);
  }

  private validationState = () => {
    if (this.state.isPristine) { return null; }
    const errors = [...this.state.asyncValidationErrors, ...this.state.syncValidationErrors];

    return errors.length > 0 ? 'error' : 'success';
  }
}

export default Form;
