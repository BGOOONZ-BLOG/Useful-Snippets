interface UseFocusTrap {
  shouldTrap: boolean | undefined;
  container: HTMLElement | null;
  onEnter?: (childNodes: HTMLElement[]) => void;
  onExit?: () => void;
}

type FocusTrapProps = React.HTMLAttributes<Element> &
  Pick<UseFocusTrap, "shouldTrap" | "onEnter" | "onExit">;

type FocusTrapType = (
  props: FocusTrapProps,
  ref: React.ForwardedRef<UseFocusTrap["container"]>
) => JSX.Element;

export type { FocusTrapProps, UseFocusTrap, FocusTrapType };
