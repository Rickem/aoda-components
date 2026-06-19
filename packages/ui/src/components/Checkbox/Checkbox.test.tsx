import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { Checkbox, CheckboxGroup } from "./index";

describe("Checkbox", () => {
  describe("accessibility — axe", () => {
    it("has no violations", async () => {
      const { container } = render(<Checkbox label="Accept terms" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations when checked", async () => {
      const { container } = render(
        <Checkbox label="Accept terms" defaultChecked />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations when indeterminate", async () => {
      const { container } = render(
        <Checkbox label="Select all" indeterminate />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations when disabled", async () => {
      const { container } = render(<Checkbox label="Accept terms" disabled />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("accessibility — keyboard", () => {
    it("is focusable via Tab", async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Accept terms" />);
      await user.tab();
      expect(screen.getByRole("checkbox")).toHaveFocus();
    });

    it("toggles on Space", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Checkbox label="Accept terms" onChange={onChange} />);
      await user.tab();
      await user.keyboard(" ");
      expect(onChange).toHaveBeenCalled();
    });

    it("does not toggle when disabled", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Checkbox label="Accept terms" disabled onChange={onChange} />
      );
      await user.tab();
      await user.keyboard(" ");
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("accessibility — screen reader contract", () => {
    it("has accessible name from label", () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByRole("checkbox")).toHaveAccessibleName(
        "Accept terms"
      );
    });

    it("reports indeterminate state via aria-checked mixed", () => {
      render(<Checkbox label="Select all" indeterminate />);
      expect(screen.getByRole("checkbox")).toHaveAttribute(
        "aria-checked",
        "mixed"
      );
    });
  });

  describe("rendering", () => {
    it("forwards ref", () => {
      const ref = vi.fn();
      render(<Checkbox label="Accept" ref={ref} />);
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });
  });
});

describe("CheckboxGroup", () => {
  describe("accessibility — axe", () => {
    it("has no violations", async () => {
      const { container } = render(
        <CheckboxGroup legend="Notification preferences">
          <Checkbox label="Email" />
          <Checkbox label="SMS" />
        </CheckboxGroup>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("accessibility — screen reader contract", () => {
    it("uses fieldset and legend for group labeling", () => {
      render(
        <CheckboxGroup legend="Preferences">
          <Checkbox label="Email" />
          <Checkbox label="SMS" />
        </CheckboxGroup>
      );
      expect(screen.getByRole("group")).toBeInTheDocument();
      expect(screen.getByText("Preferences")).toBeInTheDocument();
    });

    it("renders error message with role alert", () => {
      render(
        <CheckboxGroup legend="Preferences" error="Select at least one">
          <Checkbox label="Email" />
        </CheckboxGroup>
      );
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Select at least one"
      );
    });
  });
});
