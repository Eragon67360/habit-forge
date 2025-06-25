import { getThemeColors } from "@/constants/Data";
import { useAppStore } from "@/store/useAppStore";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryClass extends Component<Props & { colors: any }, State> {
  constructor(props: Props & { colors: any }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (__DEV__) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // In production, you would send this to a crash reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const { colors } = this.props;

      return (
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <View style={styles.content}>
            <Text style={[styles.title, { color: colors.text }]}>
              Oops! Something went wrong
            </Text>
            <Text style={[styles.message, { color: colors.textSecondary }]}>
              We&apos;re sorry, but something unexpected happened. Please try
              again.
            </Text>

            {__DEV__ && this.state.error && (
              <Text style={[styles.errorDetails, { color: colors.error }]}>
                {this.state.error.message}
              </Text>
            )}

            <TouchableOpacity
              style={[styles.retryButton, { backgroundColor: colors.primary }]}
              onPress={this.handleRetry}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to provide theme colors
export default function ErrorBoundary({ children }: Props) {
  const { currentTheme } = useAppStore();
  const colors = getThemeColors(currentTheme === "dark");

  return <ErrorBoundaryClass colors={colors}>{children}</ErrorBoundaryClass>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    alignItems: "center",
    maxWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  errorDetails: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "monospace",
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
