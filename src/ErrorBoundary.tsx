import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-2xl bg-neutral-900 border border-neutral-800 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <h2 className="text-xl font-bold font-display text-white">Something went wrong</h2>
            
            <p className="text-xs text-neutral-400 leading-relaxed">
              The page encountered an unexpected issue while rendering.
            </p>

            {this.state.error && (
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-left overflow-x-auto">
                <p className="text-[11px] font-mono text-rose-300">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={this.handleReload}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
