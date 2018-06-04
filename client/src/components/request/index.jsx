import PropTypes from 'prop-types';
import { Component } from 'react';
import { changed } from 'models/comparisons';
import { get } from 'models/object';

function castArgumentsToArray(args) {
  if (!args) {
    return [];
  }

  return Array.isArray(args) ? args : [args];
}

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export default class Request extends Component {
  static propTypes = {
    afterRequest: PropTypes.func,
    arguments: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.any),
      PropTypes.any,
    ]),
    children: PropTypes.func,
    eager: PropTypes.bool,
    request: PropTypes.func.isRequired,
  };

  static defaultProps = {
    afterRequest: () => {},
    arguments: [],
    children: () => {},
    eager: true,
  };

  currentRequest = this.props.request;
  state = INITIAL_STATE;
  willUnmount = false;

  get failed() {
    const hasNetworkError = Boolean(this.state.error);
    const hasBadStatus = get(this.state.data, 'status', 0) >= 400;

    return hasNetworkError || hasBadStatus;
  }

  get succeeded() {
    const hasData = Boolean(this.state.data);

    return !this.failed && hasData;
  }

  get requested() {
    return this.state.loading || this.failed || this.succeeded;
  }

  componentDidMount() {
    if (this.props.eager) {
      this.sendRequest();
    }
  }

  componentDidUpdate(prevProps) {
    const eagernessChanged = changed(prevProps, this.props, 'eager');
    const requestChanged = changed(prevProps, this.props, 'request');
    const argumentsChanged = changed(
      prevProps.arguments,
      this.props.arguments,
      castArgumentsToArray,
      { deep: true },
    );

    if (requestChanged) {
      this.currentRequest = this.props.request;
    }

    if (
      this.props.eager &&
      (eagernessChanged || requestChanged || argumentsChanged)
    ) {
      this.resetState();
      this.sendRequest();
    }
  }

  componentWillUnmount() {
    this.willUnmount = true;
  }

  resetState() {
    this.setState(INITIAL_STATE);
  }

  async sendRequest(args = this.props.arguments) {
    this.setState({
      loading: true,
    });

    const { request } = this.props;
    let data = null;
    let error = null;

    try {
      data = await request(...castArgumentsToArray(args));
    } catch (err) {
      error = err;
    }

    if (this.currentRequest === request) {
      const newState = {
        data,
        error,
      };

      this.props.afterRequest(newState);
      this.setState(newState);
    }
  }

  render() {
    return this.props.children({
      error: this.state.error,
      failed: this.failed,
      loading: this.state.loading,
      data: this.state.data,
      sendRequest: this.sendRequest,
    });
  }
}
