"use client"; 

import React from 'react';

/**
 * ErrorBoundary is a React component that catches JavaScript errors in its child components,
 * logs those errors, and displays a fallback UI instead of crashing the entire application.
 *
 * @component
 * @example
 * // Usage
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  /**
   * Initializes the ErrorBoundary component.
   *
   * @param {Object} props - The properties passed to the component.
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * Updates state when an error is caught.
   *
   * @param {Error} error - The error that was thrown.
   * @returns {Object} The new state indicating an error has occurred.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Logs the error and error information when an error is caught.
   *
   * @param {Error} error - The error that was thrown.
   * @param {Object} errorInfo - An object containing information about the error, including the component stack trace.
   */
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  /**
   * Renders the fallback UI or the child components.
   *
   * If an error has been caught, it displays a user-friendly error message.
   * Otherwise, it renders the child components passed to this boundary.
   *
   * @returns {JSX.Element} The rendered component, either an error message or the children.
   */
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Oops! Something went wrong.</h1>
          <p>We're having trouble loading this content. Please check your internet connection and try again.</p>
          <button onClick={() => this.setState({ hasError: false })}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
