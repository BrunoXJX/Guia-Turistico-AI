import { Component, type ErrorInfo, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("VOYAGE AI render failure", {
      message: error.message,
      stack: info.componentStack,
    });
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="grid min-h-screen place-items-center bg-premium-radial px-5 text-ink">
        <section className="glass-card max-w-sm rounded-[2rem] p-6 text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orangeDeep/70">
            VOYAGE AI
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-normal">
            Vamos retomar a viagem
          </h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate/70">
            A app encontrou uma falha temporária ao compor o ecrã.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange px-5 text-sm font-extrabold text-white shadow-glow"
          >
            <RefreshCw size={18} />
            Recarregar
          </button>
        </section>
      </main>
    );
  }
}
