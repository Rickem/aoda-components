import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  describe("accessibility — axe", () => {
    it("has no violations with default variant", async () => {
      const { container } = render(<Button>Click me</Button>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations with destructive variant", async () => {
      const { container } = render(
        <Button variant="destructive">Delete</Button>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations when disabled", async () => {
      const { container } = render(<Button disabled>Click me</Button>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations when loading", async () => {
      const { container } = render(<Button loading>Saving</Button>);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations when icon-only with aria-label", async () => {
      const { container } = render(
        <Button iconOnly aria-label="Close">
          <span>X</span>
        </Button>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("accessibility — keyboard", () => {
    it("is focusable via Tab", async () => {
      const user = userEvent.setup();
      render(<Button>Click me</Button>);
      await user.tab();
      expect(screen.getByRole("button")).toHaveFocus();
    });

    it("activates on Enter", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      await user.tab();
      await user.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalledOnce();
    });

    it("activates on Space", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      await user.tab();
      await user.keyboard(" ");
      expect(onClick).toHaveBeenCalledOnce();
    });

    it("does not activate when disabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button disabled onClick={onClick}>
          Click me
        </Button>
      );
      await user.tab();
      await user.keyboard("{Enter}");
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("accessibility — screen reader contract", () => {
    it("has role button", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("has accessible name from children", () => {
      render(<Button>Submit form</Button>);
      expect(screen.getByRole("button")).toHaveAccessibleName("Submit form");
    });

    it("has accessible name from aria-label when icon-only", () => {
      render(
        <Button iconOnly aria-label="Close dialog">
          <span>X</span>
        </Button>
      );
      expect(screen.getByRole("button")).toHaveAccessibleName("Close dialog");
    });

    it("announces loading state via aria-busy", () => {
      render(<Button loading>Saving</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    it("sets aria-disabled when disabled", () => {
      render(<Button disabled>Click me</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "aria-disabled",
        "true"
      );
    });
  });

  describe("rendering", () => {
    it("renders all three variants", () => {
      const { rerender } = render(<Button variant="primary">A</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
      rerender(<Button variant="secondary">B</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
      rerender(<Button variant="destructive">C</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders all three sizes", () => {
      const { rerender } = render(<Button size="sm">A</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
      rerender(<Button size="md">B</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
      rerender(<Button size="lg">C</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("forwards ref", () => {
      const ref = vi.fn();
      render(<Button ref={ref}>Click</Button>);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
    });

    it("passes through native button props", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
  });
});
