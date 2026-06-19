import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { useState } from "react";
import { Modal } from "./Modal";

function TestModal(props: Partial<React.ComponentProps<typeof Modal>> = {}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Confirm action"
        {...props}
      >
        <p>Are you sure you want to proceed?</p>
        <button onClick={() => setOpen(false)}>Confirm</button>
      </Modal>
    </>
  );
}

describe("Modal", () => {
  describe("accessibility — axe", () => {
    it("has no violations when open", async () => {
      const { container } = render(<TestModal />);
      await userEvent.click(screen.getByText("Open"));
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations with description", async () => {
      const { container } = render(
        <TestModal description="This action cannot be undone." />
      );
      await userEvent.click(screen.getByText("Open"));
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("accessibility — keyboard", () => {
    it("closes on Escape", async () => {
      const user = userEvent.setup();
      render(<TestModal />);
      await user.click(screen.getByText("Open"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      await user.keyboard("{Escape}");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("traps focus inside the modal", async () => {
      const user = userEvent.setup();
      render(<TestModal />);
      await user.click(screen.getByText("Open"));
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      // Tab through focusable elements — focus should stay inside
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
    });

    it("returns focus to trigger on close", async () => {
      const user = userEvent.setup();
      render(<TestModal />);
      const trigger = screen.getByText("Open");
      await user.click(trigger);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      await user.keyboard("{Escape}");
      expect(trigger).toHaveFocus();
    });
  });

  describe("accessibility — screen reader contract", () => {
    it("has role dialog", async () => {
      const user = userEvent.setup();
      render(<TestModal />);
      await user.click(screen.getByText("Open"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("has aria-modal true", async () => {
      const user = userEvent.setup();
      render(<TestModal />);
      await user.click(screen.getByText("Open"));
      expect(screen.getByRole("dialog")).toHaveAttribute(
        "aria-modal",
        "true"
      );
    });

    it("has accessible name from title", async () => {
      const user = userEvent.setup();
      render(<TestModal />);
      await user.click(screen.getByText("Open"));
      expect(screen.getByRole("dialog")).toHaveAccessibleName(
        "Confirm action"
      );
    });

    it("has accessible description when provided", async () => {
      const user = userEvent.setup();
      render(<TestModal description="This is irreversible." />);
      await user.click(screen.getByText("Open"));
      expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
        "This is irreversible."
      );
    });
  });
});
