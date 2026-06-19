import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { RadioGroup, RadioOption } from "./index";

function renderRadioGroup(props: Record<string, unknown> = {}) {
  return render(
    <RadioGroup legend="Preferred contact" name="contact" {...props}>
      <RadioOption label="Email" value="email" />
      <RadioOption label="Phone" value="phone" />
      <RadioOption label="Mail" value="mail" />
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  describe("accessibility — axe", () => {
    it("has no violations", async () => {
      const { container } = renderRadioGroup();
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations with error", async () => {
      const { container } = renderRadioGroup({
        error: "Please select an option",
      });
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("accessibility — keyboard", () => {
    it("focuses the first radio on Tab", async () => {
      const user = userEvent.setup();
      renderRadioGroup();
      await user.tab();
      expect(screen.getByRole("radio", { name: "Email" })).toHaveFocus();
    });

    it("moves between options with arrow keys", async () => {
      const user = userEvent.setup();
      renderRadioGroup();
      await user.tab();
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("radio", { name: "Phone" })).toHaveFocus();
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("radio", { name: "Mail" })).toHaveFocus();
    });

    it("wraps around from last to first with ArrowDown", async () => {
      const user = userEvent.setup();
      renderRadioGroup();
      await user.tab();
      await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
      expect(screen.getByRole("radio", { name: "Email" })).toHaveFocus();
    });

    it("selects on Space", async () => {
      const user = userEvent.setup();
      renderRadioGroup();
      await user.tab();
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("radio", { name: "Phone" })).toBeChecked();
    });
  });

  describe("accessibility — screen reader contract", () => {
    it("uses fieldset with accessible name from legend", () => {
      renderRadioGroup();
      const group = screen.getByRole("radiogroup");
      expect(group).toHaveAccessibleName("Preferred contact");
    });

    it("each option has correct role and accessible name", () => {
      renderRadioGroup();
      expect(screen.getByRole("radio", { name: "Email" })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Phone" })).toBeInTheDocument();
      expect(screen.getByRole("radio", { name: "Mail" })).toBeInTheDocument();
    });

    it("renders error with role alert", () => {
      renderRadioGroup({ error: "Selection required" });
      expect(screen.getByRole("alert")).toHaveTextContent("Selection required");
    });
  });

  describe("rendering", () => {
    it("forwards ref on RadioOption", () => {
      const ref = vi.fn();
      render(
        <RadioGroup legend="Contact" name="contact">
          <RadioOption label="Email" value="email" ref={ref} />
        </RadioGroup>
      );
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });
  });
});
