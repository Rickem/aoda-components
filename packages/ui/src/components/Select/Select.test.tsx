import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "ca", label: "Canada" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
];

describe("Select", () => {
  describe("accessibility — axe", () => {
    it("has no violations in closed state", async () => {
      const { container } = render(
        <Select label="Country" options={options} />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations with error", async () => {
      const { container } = render(
        <Select label="Country" options={options} error="Country is required" />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations when required", async () => {
      const { container } = render(
        <Select label="Country" options={options} required />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("accessibility — keyboard", () => {
    it("is focusable via Tab", async () => {
      const user = userEvent.setup();
      render(<Select label="Country" options={options} />);
      await user.tab();
      expect(screen.getByRole("combobox")).toHaveFocus();
    });

    it("opens on Enter", async () => {
      const user = userEvent.setup();
      render(<Select label="Country" options={options} />);
      await user.tab();
      await user.keyboard("{Enter}");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("opens on Space", async () => {
      const user = userEvent.setup();
      render(<Select label="Country" options={options} />);
      await user.tab();
      await user.keyboard(" ");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("closes on Escape", async () => {
      const user = userEvent.setup();
      render(<Select label="Country" options={options} />);
      await user.tab();
      await user.keyboard("{Enter}");
      expect(screen.getByRole("listbox")).toBeInTheDocument();
      await user.keyboard("{Escape}");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("navigates options with arrow keys and selects with Enter", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Select
          label="Country"
          options={options}
          onValueChange={onValueChange}
        />
      );
      await user.tab();
      await user.keyboard("{Enter}");
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");
      expect(onValueChange).toHaveBeenCalled();
    });
  });

  describe("accessibility — screen reader contract", () => {
    it("has accessible name from label", () => {
      render(<Select label="Country" options={options} />);
      expect(screen.getByRole("combobox")).toHaveAccessibleName("Country");
    });

    it("trigger shows selected value text", async () => {
      render(
        <Select label="Country" options={options} value="ca" onValueChange={() => {}} />
      );
      expect(screen.getByRole("combobox")).toHaveTextContent("Canada");
    });

    it("sets aria-invalid when error is present", () => {
      render(
        <Select label="Country" options={options} error="Required" />
      );
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });

    it("sets aria-required when required", () => {
      render(<Select label="Country" options={options} required />);
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "aria-required",
        "true"
      );
    });

    it("displays error message text", () => {
      render(
        <Select label="Country" options={options} error="Required" />
      );
      expect(screen.getByText("Required")).toBeInTheDocument();
    });
  });
});
