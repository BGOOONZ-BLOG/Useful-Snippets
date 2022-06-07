import { useRef, useState } from "react";
import { screen, render } from "src/lib/testWrappers";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { useFocusTrap, FocusTrap } from "./index";

const TestComponent = () => {
  const panel = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useFocusTrap({
    shouldTrap: isOpen,
    container: panel.current,
    onEnter: () => panel.current?.focus(),
    onExit: () => setIsOpen(false),
  });

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>toggle</button>
      <div ref={panel} role="dialog" tabIndex={-1}>
        {isOpen && (
          <>
            <button>button</button>
            <input type="text" name="input" id="input" placeholder="input" />
            <label htmlFor="input">input</label>
            <a href="/home">link</a>
          </>
        )}
      </div>
    </div>
  );
};

describe("useFocusTrap", () => {
  it("traps the focus within the container when pressing tab", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    // open dialog
    let trigger = await screen.findByRole("button", { name: /toggle/i });
    trigger.focus();
    expect(trigger).toHaveFocus();
    await user.click(trigger);

    // dialog displays and has focus
    const dialogContent = screen.queryByText(/link/i);
    const dialog = await screen.findByRole("dialog");
    expect(dialogContent).toBeInTheDocument();
    expect(dialog).toHaveFocus();

    // tab moves focus to next element
    const button = await screen.findByRole("button", { name: /button/i });
    await user.tab();
    expect(button).toHaveFocus();

    // tab moves focus to next element
    await user.tab();
    const textbox = await screen.findByRole("textbox", { name: /input/i });
    expect(textbox).toHaveFocus();

    // tab moves focus to next element
    await user.tab();
    const link = await screen.findByRole("link", { name: /link/i });
    expect(link).toHaveFocus();

    // we have tabbed through all elements, so now focus should cycle back to the first element
    await user.tab();
    expect(button).toHaveFocus();

    // it closes and returns focus to originally focused element
    await user.keyboard("{Escape}");
    trigger = await screen.findByRole("button", { name: /toggle/i });

    expect(dialogContent).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("traps the focus within the container when pressing shift+tab", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    // open dialog
    const trigger = await screen.findByRole("button", { name: /toggle/i });
    trigger.focus();
    expect(trigger).toHaveFocus();
    await user.click(trigger);

    // dialog displays and has focus
    const dialogContent = screen.queryByText(/link/i);
    const dialog = await screen.findByRole("dialog");
    expect(dialogContent).toBeInTheDocument();
    expect(dialog).toHaveFocus();

    // moves backwards
    const link = await screen.findByRole("link", { name: /link/i });
    await user.tab({ shift: true });
    expect(link).toHaveFocus();

    // moves back again
    await user.tab({ shift: true });
    const textbox = await screen.findByRole("textbox", { name: /input/i });
    expect(textbox).toHaveFocus();
  });
});

export const FocusTrapTest = () => {
  const [isThere, setIsThere] = useState(false);

  return (
    <div>
      <button onClick={() => setIsThere((v) => !v)}>toggle</button>
      {/**
       * The main functionality of the FocusTrap component is to wrap over the useFocusTrap hook
       * and handle situations like this where the focus trap container ref is attached to a conditionally rendered element.
       * We need to ensure that the element exists and the ref is attached before we focus it.
       */}
      {isThere && (
        <FocusTrap
          shouldTrap={isThere}
          onEnter={([first]) => first?.focus()}
          onExit={() => setIsThere(false)}
        >
          <button>1</button>
          <button>2</button>
        </FocusTrap>
      )}
    </div>
  );
};

export const FocusTrapTestForwardRef = () => {
  const [isThere, setIsThere] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div>
      <button onClick={() => setIsThere((v) => !v)}>toggle</button>
      {isThere && (
        <FocusTrap
          shouldTrap={isThere}
          ref={container}
          onEnter={() => container.current?.focus()}
          onExit={() => setIsThere(false)}
          role="dialog"
          tabIndex={-1}
        >
          <button>1</button>
          <button>2</button>
        </FocusTrap>
      )}
    </div>
  );
};

describe("FocusTrap", () => {
  it("focuses AFTER the ref has been successfully attached", async () => {
    render(<FocusTrapTest />);

    let trigger = await screen.findByRole("button", { name: /toggle/i });

    trigger.focus();
    expect(trigger).toHaveFocus();
    // open trap
    await userEvent.click(trigger);
    // first item has focus
    expect(await screen.findByRole("button", { name: /1/i })).toHaveFocus();
    // close trap
    await userEvent.keyboard("{Escape}");
    // focus is returned to trigger
    trigger = await screen.findByRole("button", { name: /toggle/i });
    expect(trigger).toHaveFocus();
  });

  it("forwards a ref", async () => {
    render(<FocusTrapTestForwardRef />);

    let trigger = await screen.findByRole("button", { name: /toggle/i });

    trigger.focus();

    expect(trigger).toHaveFocus();
    // open trap
    await userEvent.click(trigger);
    // focus first on dialog which is forwardedRef
    expect(await screen.getByRole("dialog")).toHaveFocus();
    // go to next item
    await userEvent.tab();
    // first item has focus
    expect(await screen.findByRole("button", { name: /1/i })).toHaveFocus();
    // close trap
    await userEvent.keyboard("{Escape}");
    // focus is returned to trigger
    trigger = await screen.findByRole("button", { name: /toggle/i });
    expect(trigger).toHaveFocus();
  });
});
