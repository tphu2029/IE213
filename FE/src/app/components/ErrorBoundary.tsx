import { Component, type ReactNode, type ErrorInfo } from "react";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-[28px] flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={36} className="text-red-500" />
            </div>
            <h1 className="text-2xl font-black dark:text-white mb-3">
              Đã xảy ra lỗi không mong muốn
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 font-medium">
              Ứng dụng gặp sự cố. Vui lòng thử tải lại trang.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <pre className="text-left text-xs bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 p-4 rounded-2xl mt-4 mb-6 overflow-auto max-h-40 border border-red-100 dark:border-red-900/30">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex gap-3 justify-center mt-6">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 dark:text-white font-bold text-sm hover:bg-gray-200 transition-all"
              >
                <RefreshCw size={16} /> Tải lại
              </button>
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none transition-all"
              >
                <Home size={16} /> Về trang chủ
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
