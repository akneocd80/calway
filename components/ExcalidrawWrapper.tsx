import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';

const Excalidraw = dynamic(
  async () => {
    const { Excalidraw } = await import('@excalidraw/excalidraw');
    return Excalidraw;
  },
  {
    ssr: false,
    loading: () => <div>Loading...</div>
  }
);

function ErrorFallback({error}: {error: Error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default function ExcalidrawWrapper() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="excalidraw-wrapper">
        <Excalidraw />
      </div>
    </ErrorBoundary>
  );
} 