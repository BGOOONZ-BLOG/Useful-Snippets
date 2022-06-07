import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface TransitionProps extends React.HTMLAttributes<Element> {
  active: boolean;
  children: React.ReactNode;
  className?: string;
}

const Transition = ({ children }: TransitionProps) => {
  return <div>{children}</div>;
};

const Height = ({
  active,
  children,
  className = "",
  ...rest
}: TransitionProps) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // get the height of the accordion item child
  // to toggle the max-height transition
  useEffect(() => {
    if (contentRef?.current?.firstChild instanceof Element) {
      setMaxHeight(contentRef.current.firstChild.clientHeight);
    }
  }, [active, contentRef]);

  return (
    <div
      aria-hidden={!active}
      className={`overflow-hidden transition-all ease-in-out ${className}`}
      ref={contentRef}
      style={{
        transitionDuration: "300ms",
        ...(active
          ? { maxHeight: `${maxHeight}px`, visibility: "visible" }
          : { maxHeight: "0", visibility: "hidden" }),
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

const Fade = ({ active, children, className = "" }: TransitionProps) => {
  return (
    <div
      aria-hidden={!active}
      className={`overflow-hidden transition-all ease-in-out ${className}`}
      style={{
        transitionDuration: "300ms",
        ...(active
          ? { opactiy: 1, visibility: "visible" }
          : { opacity: 0, visibility: "hidden" }),
      }}
    >
      {children}
    </div>
  );
};

const RevealDown = ({ active, children, className = "" }: TransitionProps) => (
  <div
    aria-hidden={!active}
    className={`transition-all ease-in-out ${className}`}
    style={{
      transitionDuration: "350ms",
      ...(active
        ? { opactiy: 1, transform: "translateY(0px)", visibility: "visible" }
        : {
            opacity: 0,
            transform: "translateY(-200px)",
            visibility: "hidden",
          }),
    }}
  >
    {children}
  </div>
);

const Slide = ({
  className = "",
  from = "100",
  to = "0",
  ...props
}: React.PropsWithChildren<{
  className?: string;
  to?: number | string;
  from?: number | string;
}>) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const applyFocus = () => {
    const roleEqualsDialog = ref.current?.closest('[role="dialog"]');
    (roleEqualsDialog as HTMLElement)?.focus();
  };

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--slide-to", `${to}%`);
    document.documentElement.style.setProperty("--slide-from", `${from}%`);
    return () => {
      document.documentElement.style.removeProperty("--slide-to");
      document.documentElement.style.removeProperty("--slide-from");
    };
  }, [to, from]);

  return (
    <div
      className={`animate-slide transform-gpu will-change-transform ${className}`}
      {...props}
      ref={ref}
      onAnimationEnd={applyFocus}
    />
  );
};

Transition.Height = Height;
Transition.Fade = Fade;
Transition.RevealDown = RevealDown;
Transition.Slide = Slide;

export default Transition;
