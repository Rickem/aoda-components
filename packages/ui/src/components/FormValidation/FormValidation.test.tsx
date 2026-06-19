import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, it, expect } from "vitest";
import { FormField, FormErrorSummary } from "./index";

describe("FormField", () => {
  describe("accessibility — axe", () => {
    it("has no violations in default state", async () => {
      const { container } = render(
        <FormField label="Email" htmlFor="email">
          <input id="email" type="email" />
        </FormField>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations with error", async () => {
      const { container } = render(
        <FormField label="Email" htmlFor="email" error="Email is required">
          <input id="email" type="email" aria-invalid="true" aria-describedby="email-error" />
        </FormField>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("accessibility — screen reader contract", () => {
    it("renders label associated with htmlFor", () => {
      render(
        <FormField label="Email" htmlFor="email">
          <input id="email" type="email" />
        </FormField>
      );
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("renders error with aria-live polite", () => {
      render(
        <FormField label="Email" htmlFor="email" error="Invalid email">
          <input id="email" type="email" />
        </FormField>
      );
      const errorEl = screen.getByText("Invalid email");
      expect(errorEl).toHaveAttribute("aria-live", "polite");
    });

    it("provides error id for aria-describedby linking", () => {
      render(
        <FormField label="Email" htmlFor="email" error="Required">
          <input id="email" type="email" />
        </FormField>
      );
      const errorEl = screen.getByText("Required");
      expect(errorEl.id).toBe("email-error");
    });

    it("shows required indicator", () => {
      render(
        <FormField label="Email" htmlFor="email" required>
          <input id="email" type="email" />
        </FormField>
      );
      expect(screen.getByText("*")).toBeInTheDocument();
    });
  });
});

describe("FormErrorSummary", () => {
  const errors = [
    { field: "Email", fieldId: "email", message: "Email is required" },
    { field: "Password", fieldId: "password", message: "Password is too short" },
  ];

  describe("accessibility — axe", () => {
    it("has no violations", async () => {
      const { container } = render(<FormErrorSummary errors={errors} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("accessibility — screen reader contract", () => {
    it("uses aria-live assertive for the summary region", () => {
      render(<FormErrorSummary errors={errors} />);
      const region = screen.getByRole("alert");
      expect(region).toBeInTheDocument();
    });

    it("lists all errors", () => {
      render(<FormErrorSummary errors={errors} />);
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is too short")).toBeInTheDocument();
    });

    it("renders links to the errored fields", () => {
      render(<FormErrorSummary errors={errors} />);
      const emailLink = screen.getByRole("link", { name: /Email/i });
      expect(emailLink).toHaveAttribute("href", "#email");
      const passwordLink = screen.getByRole("link", { name: /Password/i });
      expect(passwordLink).toHaveAttribute("href", "#password");
    });

    it("renders nothing when no errors", () => {
      const { container } = render(<FormErrorSummary errors={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it("announces error count", () => {
      render(<FormErrorSummary errors={errors} />);
      expect(
        screen.getByText(/2 errors? need/i, { exact: false })
      ).toBeInTheDocument();
    });
  });
});
