import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3] p-8 flex flex-col items-center justify-center font-mono">
          <div className="max-w-2xl w-full p-6 rounded-2xl bg-[#161B22] border border-rose-500/50 space-y-4 shadow-2xl">
            <h1 className="text-xl font-bold text-rose-500 flex items-center gap-2">
              ⚠️ React Runtime Exception Captured
            </h1>
            <p className="text-sm text-[#8B949E]">
              {this.state.error?.toString()}
            </p>
            {this.state.errorInfo && (
              <pre className="p-4 rounded-xl bg-[#0D1117] text-xs text-rose-300 overflow-x-auto leading-relaxed border border-rose-500/20">
                {this.state.errorInfo.componentStack}
              </pre>
            )}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
            >
              Clear Local Cache & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
