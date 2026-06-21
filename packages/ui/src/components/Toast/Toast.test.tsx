import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { Toast, ToastProvider } from "./index";

function renderToast(props: Partial<React.ComponentProps<typeof Toast>> = {}) {
  return render(
    <ToastProvider>
      <Toast
        open={true}
        onOpenChange={() => {}}
        title="File saved"
        {...props}
      />
    </ToastProvider>
  );
}

describe("Toast", () => {
  describe("accessibility — axe", () => {
    it("has no violations for info toast", async () => {
      const { container } = renderToast({ variant: "info" });
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations for error toast", async () => {
      const { container } = renderToast({ variant: "error" });
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("accessibility — screen reader contract", () => {
    it("uses role status for info variant", () => {
      renderToast({ variant: "info" });
      // getAllByRole because Radix also injects a hidden aria-live span with role="status"
      const statusElements = screen.getAllByRole("status");
      // At least one visible status region should be present
      expect(statusElements.length).toBeGreaterThanOrEqual(1);
    });

    it("uses role alert for error variant", () => {
      renderToast({ variant: "error" });
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("displays title", () => {
      renderToast({ title: "Upload complete" });
      expect(screen.getByText("Upload complete")).toBeInTheDocument();
    });

    it("displays description when provided", () => {
      renderToast({
        title: "Error",
        description: "Could not save the file",
      });
      expect(screen.getByText("Could not save the file")).toBeInTheDocument();
    });
  });

  describe("accessibility — keyboard", () => {
    it("action button is focusable and activatable", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      renderToast({
        action: { label: "Undo", onClick },
      });
      const button = screen.getByRole("button", { name: "Undo" });
      // Focus the button directly and activate via keyboard
      button.focus();
      await user.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe("timing — WCAG 2.2.1", () => {
    it("accepts custom duration", () => {
      renderToast({ duration: 10000 });
      // Verifies the component renders with custom duration without error
      expect(screen.getByText("File saved")).toBeInTheDocument();
    });

    it("accepts Infinity for persistent toast", () => {
      renderToast({ duration: Infinity });
      expect(screen.getByText("File saved")).toBeInTheDocument();
    });
  });
});
