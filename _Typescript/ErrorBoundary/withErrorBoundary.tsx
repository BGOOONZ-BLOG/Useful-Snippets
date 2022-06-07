/* eslint-disable no-console */
import React, { useEffect } from "react";
import Logger from "src/lib/Logger";
import uid from "uid";
import ErrorBoundary from "./index";

// Basically we try/catch WrappedComponent render so that we can render ErrorComponent if SSR error is caught
// Reference https://github.com/nayaknotnull/react-isomorphic-error-boundary

type ErrorComponentProps = {
  componentName?: string;
  error?: Error;
  errorId?: string;
};

const ErrorComponent = ({
  componentName,
  error,
  errorId,
}: ErrorComponentProps) => {
  useEffect(() => {
    console.groupCollapsed(`😵 %c${componentName} ${errorId}`, "color: red");
    console.error(error);
    console.groupEnd();
  }, []);
  // TODO it would be better to have more descriptive env vars so that we could still show the error component
  // in eg 'scjsstest', 'scdev', etc rather than just switching on NODE_ENV 'production'/'development'
  if (process.env.NODE_ENV === "production") {
    return null;
  }
  return (
    <div className="flex flex-col items-center text-center bg-gray-light p-12">
      <span aria-label="error emoji" className="text-xl" role="img">
        😵
      </span>
      <h3 className="text-gray-darker font-bold">
        This functionality is currently unavailable.
      </h3>
      <p>Please contact customer service if you need assistance.</p>
      {errorId && (
        <aside className="p-4 m-4 border">
          An error occured {componentName && <span> in {componentName}</span>}
          <p>{error?.message}</p>
          <p>errorId: {errorId}</p>
        </aside>
      )}
    </div>
  );
};

type WithErrorBoundary = <Props extends {}>(
  WrappedComponent: React.FC<Props>
) => React.ComponentType<Props>;

const ServerBoundary: WithErrorBoundary = (WrappedComponent) => {
  return (props) => {
    try {
      return WrappedComponent(props);
    } catch (error: any) {
      const componentName: string = (props as any)?.rendering?.componentName;

      Logger(error, { componentName, message: "Rendering Error" });

      return ErrorComponent({
        error,
        componentName,
      });
    }
  };
};

const ClientBoundary: WithErrorBoundary = (WrappedComponent) => {
  // We only create the errorId on the client bc
  // 1. AppInisghts isn't configured to log our server errors 😫
  // 2. We would end up creating two different uid (one on server and one on client) so we'd either have to live with
  // mismatching errorIds or pass the errorId from the server and reconstruct it on the client.
  const errorId = uid();

  return function Component(props) {
    const componentName: string = (props as any)?.rendering?.componentName;

    return (
      <ErrorBoundary
        fallback={
          <ErrorComponent componentName={componentName} errorId={errorId} />
        }
        onCatch={(error) =>
          Logger(error, { componentName, errorId, message: "Rendering Error" })
        }
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
};

const isClient = typeof window !== "undefined";
// React's ErrorBoundary feature safely handles errors, but this functionality is restricted to Client rendering.
// For SSR we approximate the Client ErrorBoundary by try/catch-ing our component render. NOTE: his technique will NOT catch
// errors deeper in the component tree, but it's better than nothing!
const withErrorBoundary = isClient ? ClientBoundary : ServerBoundary;

export default withErrorBoundary;
