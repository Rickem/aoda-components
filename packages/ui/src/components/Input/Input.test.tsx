import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  describe("accessibility — axe", () => {
    it("has no violations in default state", async () => {
      const { container } = render(<Input label="Email" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations with error", async () => {
      const { container } = render(
        <Input label="Email" error="Email is required" />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations with helper text", async () => {
      const { container } = render(
        <Input label="Email" helperText="We'll never share your email" />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations when required", async () => {
      const { container } = render(<Input label="Email" required />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations when disabled", async () => {
      const { container } = render(<Input label="Email" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("accessibility — keyboard", () => {
    it("is focusable via Tab", async () => {
      const user = userEvent.setup();
      render(<Input label="Email" />);
      await user.tab();
      expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("accepts text input", async () => {
      const user = userEvent.setup();
      render(<Input label="Email" />);
      await user.tab();
      await user.type(screen.getByRole("textbox"), "hello@test.com");
      expect(screen.getByRole("textbox")).toHaveValue("hello@test.com");
    });
  });

  describe("accessibility — screen reader contract", () => {
    it("has accessible name from label", () => {
      render(<Input label="Email address" />);
      expect(screen.getByRole("textbox")).toHaveAccessibleName(
        "Email address"
      );
    });

    it("associates error message via aria-describedby", () => {
      render(<Input label="Email" error="Email is required" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAccessibleDescription("Email is required");
    });

    it("associates helper text via aria-describedby", () => {
      render(<Input label="Email" helperText="Enter your work email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAccessibleDescription("Enter your work email");
    });

    it("includes both error and helper text in description when both present", () => {
      render(
        <Input
          label="Email"
          error="Email is required"
          helperText="Enter your work email"
        />
      );
      const input = screen.getByRole("textbox");
      const describedBy = input.getAttribute("aria-describedby");
      expect(describedBy).toBeTruthy();
      const ids = describedBy!.split(" ");
      expect(ids.length).toBe(2);
    });

    it("sets aria-invalid when error is present", () => {
      render(<Input label="Email" error="Email is required" />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });

    it("does not set aria-invalid when no error", () => {
      render(<Input label="Email" />);
      expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
    });

    it("sets aria-required when required", () => {
      render(<Input label="Email" required />);
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-required",
        "true"
      );
    });

    it("shows visible required indicator", () => {
      render(<Input label="Email" required />);
      expect(screen.getByText("*")).toBeInTheDocument();
    });
  });

  describe("rendering", () => {
    it("always renders a visible label", () => {
      render(<Input label="Email" />);
      expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("renders error message text", () => {
      render(<Input label="Email" error="Invalid email" />);
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });

    it("renders helper text", () => {
      render(<Input label="Email" helperText="Work email preferred" />);
      expect(screen.getByText("Work email preferred")).toBeInTheDocument();
    });

    it("forwards ref", () => {
      const ref = vi.fn();
      render(<Input label="Email" ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });
  });
});
