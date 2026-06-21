import { cn } from "../../lib/utils";

export interface DataTableColumn {
  key: string;
  header: string;
  sortable?: boolean;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: DataTableColumn[];
  data: T[];
  caption?: string;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  caption,
  onSort,
  sortKey,
  sortDirection,
  className,
}: DataTableProps<T>) {
  function handleSort(key: string) {
    if (!onSort) return;
    const newDirection =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    onSort(key, newDirection);
  }

  function getAriaSortValue(
    key: string
  ): "ascending" | "descending" | "none" | undefined {
    if (sortKey !== key) return undefined;
    return sortDirection === "asc" ? "ascending" : "descending";
  }

  return (
    <table className={cn("w-full border-collapse text-sm", className)}>
      {caption && <caption className="sr-only">{caption}</caption>}
      <thead>
        <tr className="border-b border-gray-200">
          {columns.map((col) => (
            <th
              key={col.key}
              scope="col"
              aria-sort={getAriaSortValue(col.key)}
              className={cn(
                "px-4 py-3 text-left font-semibold text-gray-900",
                col.sortable && "cursor-pointer"
              )}
            >
              {col.sortable ? (
                <button
                  type="button"
                  onClick={() => handleSort(col.key)}
                  className="inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
                >
                  {col.header}
                  <span aria-hidden="true" className="text-gray-400">
                    {sortKey === col.key
                      ? sortDirection === "asc"
                        ? " ↑"
                        : " ↓"
                      : " ↕"}
                  </span>
                </button>
              ) : (
                col.header
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-b border-gray-100 hover:bg-gray-50"
          >
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-3 text-gray-700">
                {String(row[col.key] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
