import React from 'react';
import { AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught exception:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/40">
          <div className="max-w-md w-full bg-background rounded-lg shadow-lg border p-8 text-center">
             <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
             <h1 className="text-2xl font-bold mb-2 text-foreground">Something went wrong.</h1>
             <p className="text-muted-foreground mb-6">
                An unexpected system error occurred. Our team has been notified.
             </p>
             <button 
                onClick={() => window.location.reload()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium"
             >
                Reload Application
             </button>
             {/* Dev details */}
             {process.env.NODE_ENV === 'development' && (
                <div className="mt-8 text-left bg-muted p-4 rounded text-xs overflow-auto max-h-40">
                    <pre className="text-destructive font-mono">{this.state.error?.toString()}</pre>
                </div>
             )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
