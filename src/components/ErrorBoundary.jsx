import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { track } from '../lib/analytics';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null, showDetails: import.meta.env.DEV };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console in dev and to analytics in all envs
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, info);
    }
    try {
      track('error_boundary', {
        message: error?.message,
        stack: error?.stack,
        componentStack: info?.componentStack,
      });
    } catch (trackingError) {
      if (import.meta.env.DEV) {
        console.warn('ErrorBoundary analytics tracking failed:', trackingError);
      }
    }
    this.setState({ info });
  }

  handleReset() {
    this.setState({ hasError: false, error: null, info: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
          <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-6 text-center">
            <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-4">
              An unexpected error occurred. You can try again or reload the page.
            </p>
            <div className="flex gap-3 justify-center mb-4">
              <button
                onClick={this.handleReset}
                className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
              >
                Try again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-700 transition-colors"
              >
                Reload
              </button>
            </div>
            {this.state.showDetails && (
              <details open className="text-left bg-gray-100 rounded p-3 text-sm max-h-64 overflow-auto">
                <summary className="mb-2 cursor-pointer">Error details (dev)</summary>
                {this.state.error && (
                  <pre className="whitespace-pre-wrap break-words">{String(this.state.error?.message || this.state.error)}</pre>
                )}
                {this.state.info?.componentStack && (
                  <pre className="mt-2 text-gray-700 whitespace-pre-wrap break-words">{this.state.info.componentStack}</pre>
                )}
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

export function ErrorBoundaryRoutes({ children }) {
  const location = useLocation();
  // Reset the error boundary when the route changes
  return <ErrorBoundary key={location.pathname}>{children}</ErrorBoundary>;
}


