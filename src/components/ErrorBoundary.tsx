'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import * as Sentry from '@sentry/nextjs'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  /** Optional: call when an error is caught (e.g. send to Sentry). */
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorId: string
}

function generateErrorId(): string {
  return `err_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorId: '',
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error, errorId: generateErrorId() }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    const { errorId } = this.state
    this.props.onError?.(error, errorInfo, errorId)
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.withScope((scope) => {
        scope.setTag('error_boundary_id', errorId)
        scope.setContext('react_component_stack', { componentStack: errorInfo.componentStack })
        Sentry.captureException(error)
      })
    }
  }

  private handleCopyId = () => {
    const { errorId } = this.state
    if (errorId && typeof navigator?.clipboard?.writeText === 'function') {
      navigator.clipboard.writeText(errorId)
    }
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-300 mb-4">We&apos;re working to fix this issue.</p>
            {this.state.errorId && (
              <p className="text-gray-500 text-sm mb-2">
                Error ID: <code className="bg-white/10 px-2 py-1 rounded">{this.state.errorId}</code>
                <button
                  type="button"
                  onClick={this.handleCopyId}
                  className="ml-2 text-yellow-400 hover:underline text-xs"
                >
                  Copy
                </button>
              </p>
            )}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
