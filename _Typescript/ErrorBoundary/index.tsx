import React from 'react';
import Logger from 'src/lib/Logger';

interface Props {
  fallback: JSX.Element;
  onCatch?: (error: Error) => void;
}

interface State {
  error: Error | null;
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { error, hasError: true };
  }

  constructor(props: Props) {
    super(props);
    this.state = { error: null, hasError: false };
  }

  componentDidCatch(error: Error) {
    if (this.props.onCatch) {
      this.props.onCatch(error);
    } else {
      Logger(error);
    }
  }

  render() {
    if (this.state.hasError) {
      // We could pass the error back to the fallback component for it to display, something like:
      // `this.props.fallback(error)` but we log the error anyway so for now let's opt to keep it simple.
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
