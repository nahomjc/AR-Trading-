"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type Model3DErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
  onError?: () => void;
};

type Model3DErrorBoundaryState = {
  hasError: boolean;
};

export class Model3DErrorBoundary extends Component<
  Model3DErrorBoundaryProps,
  Model3DErrorBoundaryState
> {
  state: Model3DErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): Model3DErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
