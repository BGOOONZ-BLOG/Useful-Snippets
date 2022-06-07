import React, {
  useEffect,
  useLayoutEffect,
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import Logger from 'src/lib/Logger';
import { UseFocusTrap, FocusTrapType } from './types';

const isHTMLElement = (el: unknown): el is HTMLElement => el instanceof HTMLElement;

const getChildNodes = (container: HTMLElement | null) => {
  if (!isHTMLElement(container)) {
    Logger(`Cannot get child nodes, ${container} is not an HTMLElment`);
    return [];
  }

  const focusableTags =
    '[href], button, textarea, input, select, details, iframe, [tabindex]:not([tabindex="-1"]';
  // get a list of child nodes in the trap container's content
  const childNodes = Array.from(container.querySelectorAll(focusableTags)).filter(
    node => !node.getAttribute('aria-hidden') && !node.hasAttribute('disabled')
  );
  return childNodes as HTMLElement[];
};

const useFocusTrap = ({ container, onExit, onEnter, shouldTrap }: UseFocusTrap) => {
  const previouslyFocusedElement = React.useRef<HTMLElement | null>(null);

  const handleExit = () => {
    onExit?.();
  };

  // `useLayoutEffect` runs before browser paint; at this point `document.activeElement`
  // has not yet been updated to the focus trap container so we can grab that HTMLElement and
  // store it in a ref to use later.
  useLayoutEffect(() => {
    if (shouldTrap && isHTMLElement(document.activeElement)) {
      previouslyFocusedElement.current = document.activeElement;
    }
  }, [shouldTrap]);

  useEffect(() => {
    /**  prevents tabbing outside of the trap */
    const handleTab = (event: KeyboardEvent) => {
      if (!shouldTrap || !isHTMLElement(container)) {
        return;
      }

      const childNodes = getChildNodes(container);

      const isChildNode = container?.contains(document.activeElement);
      const lastNode = childNodes[childNodes.length - 1];
      const firstNode = childNodes[0];
      const isFirstNode = document.activeElement === firstNode;
      const isLastNode = document.activeElement === lastNode;
      const isContainer = document.activeElement === container;

      /** tab, moves focus forward */
      const handleForward = () => {
        if (isLastNode) {
          event.preventDefault();
          isHTMLElement(firstNode) && firstNode.focus();
        }
      };

      /** shift + tab, moves focus backward */
      const handleBackward = () => {
        if (isFirstNode || isContainer) {
          event.preventDefault();
          isHTMLElement(lastNode) && lastNode.focus();
        }
      };

      if (isChildNode) {
        event.shiftKey ? handleBackward() : handleForward();
      } else {
        // The document.activeElement is not a childNode, e.g. user is focused on url bar
        // when they tab onto the page we need to send focus to the first element
        event.preventDefault();
        firstNode.focus();
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Tab':
          return handleTab(event);
        case 'Escape':
          return handleExit();
        default:
          return event;
      }
    };

    if (shouldTrap) {
      if (onEnter) {
        onEnter(getChildNodes(container));
      }

      document.addEventListener('keydown', handleKeydown);
    }

    return () => {
      previouslyFocusedElement.current?.focus();

      document.removeEventListener('keydown', handleKeydown);
    };
  }, [shouldTrap]);
};

const FocusTrapComponent: FocusTrapType = ({ onEnter, onExit, shouldTrap, ...props }, ref) => {
  const [isReady, setIsReady] = useState(false);
  const container = useRef<HTMLDivElement | null>(null);
  // assign forwarded ref to container.current
  useImperativeHandle(ref, () => container.current!, [ref]);
  const shouldTrapAndIsReady = shouldTrap && isReady;
  useFocusTrap({ shouldTrap: shouldTrapAndIsReady, container: container.current, onEnter, onExit });

  return (
    <div
      ref={element => {
        container.current = element;
        setIsReady(true);
      }}
      {...props}
    />
  );
};

const FocusTrap = forwardRef(FocusTrapComponent);

export { useFocusTrap, getChildNodes, FocusTrap };
