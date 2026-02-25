'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the component tree,
 * logs errors, and displays a fallback UI instead of crashing the entire app.
 * 
 * Usage: Wrap your app or components in <ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('[ErrorBoundary] Caught error:', error);
    console.error('[ErrorBoundary] Error info:', errorInfo);
    
    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // Example:
    // Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Something went wrong
              </h1>
              <p className="text-gray-400 mb-2">
                We apologize for the inconvenience. An unexpected error occurred.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="text-sm text-cyan-400 cursor-pointer hover:text-cyan-300">
                    Error Details (Dev Only)
                  </summary>
                  <pre className="mt-2 p-4 bg-gray-900 rounded-lg text-xs text-red-400 overflow-auto">
                    {this.state.error.toString()}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
              >
                Reload Page
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full px-6 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-cyan-400/10 hover:border-cyan-400/30 border border-white/10 transition-all"
              >
                Go to Homepage
              </button>
            </div>
            
            <p className="text-xs text-gray-600 mt-8">
              If this problem persists, please contact support at{' '}
              <a href="mailto:support@recxchange.io" className="text-cyan-400 hover:text-cyan-300">
                support@recxchange.io
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
