import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, it, expect, vi } from "vitest";
import { DataTable } from "./DataTable";

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role" },
];

const data = [
  { name: "Alice", email: "alice@example.com", role: "Admin" },
  { name: "Bob", email: "bob@example.com", role: "User" },
  { name: "Charlie", email: "charlie@example.com", role: "User" },
];

describe("DataTable", () => {
  describe("accessibility — axe", () => {
    it("has no violations", async () => {
      const { container } = render(
        <DataTable columns={columns} data={data} caption="User list" />
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations with sort active", async () => {
      const { container } = render(
        <DataTable
          columns={columns}
          data={data}
          caption="User list"
          sortKey="name"
          sortDirection="asc"
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe("accessibility — keyboard", () => {
    it("sortable column headers are focusable and activatable", async () => {
      const user = userEvent.setup();
      const onSort = vi.fn();
      render(
        <DataTable columns={columns} data={data} caption="User list" onSort={onSort} />
      );
      await user.tab();
      // Focus lands on the button inside the th (correct keyboard behavior)
      const nameHeader = screen.getByRole("columnheader", { name: /Name/i });
      expect(nameHeader.querySelector("button")).toHaveFocus();
      await user.keyboard("{Enter}");
      expect(onSort).toHaveBeenCalledWith("name", "asc");
    });

    it("non-sortable headers are not focusable", () => {
      render(
        <DataTable columns={columns} data={data} caption="User list" />
      );
      const roleHeader = screen.getByRole("columnheader", { name: "Role" });
      expect(roleHeader.querySelector("button")).toBeNull();
    });
  });

  describe("accessibility — screen reader contract", () => {
    it("uses table with caption", () => {
      render(
        <DataTable columns={columns} data={data} caption="User list" />
      );
      expect(screen.getByRole("table")).toHaveAccessibleName("User list");
    });

    it("uses th with scope col", () => {
      render(
        <DataTable columns={columns} data={data} caption="User list" />
      );
      const headers = screen.getAllByRole("columnheader");
      headers.forEach((header) => {
        expect(header).toHaveAttribute("scope", "col");
      });
    });

    it("sets aria-sort on sorted column", () => {
      render(
        <DataTable
          columns={columns}
          data={data}
          caption="User list"
          sortKey="name"
          sortDirection="asc"
        />
      );
      const nameHeader = screen.getByRole("columnheader", { name: /Name/i });
      expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
    });

    it("sets aria-sort descending", () => {
      render(
        <DataTable
          columns={columns}
          data={data}
          caption="User list"
          sortKey="name"
          sortDirection="desc"
        />
      );
      const nameHeader = screen.getByRole("columnheader", { name: /Name/i });
      expect(nameHeader).toHaveAttribute("aria-sort", "descending");
    });

    it("renders correct number of rows", () => {
      render(
        <DataTable columns={columns} data={data} caption="User list" />
      );
      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(4); // 1 header row + 3 data rows
    });
  });
});
