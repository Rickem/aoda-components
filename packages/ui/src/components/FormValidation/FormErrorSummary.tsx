import { cn } from "../../lib/utils";

export interface FormError {
  field: string;
  fieldId: string;
  message: string;
}

export interface FormErrorSummaryProps {
  errors: FormError[];
  className?: string;
}

export function FormErrorSummary({ errors, className }: FormErrorSummaryProps) {
  if (errors.length === 0) return null;

  return (
    <div
      className={cn(
        "rounded-md border border-destructive-600 bg-destructive-50 p-4",
        className
      )}
      role="alert"
    >
      <h2 className="text-sm font-semibold text-destructive-700">
        {errors.length} {errors.length === 1 ? "error needs" : "errors need"}{" "}
        to be corrected
      </h2>
      <ul className="mt-2 list-disc pl-5">
        {errors.map((error) => (
          <li key={error.fieldId} className="text-sm text-destructive-700">
            <a
              href={`#${error.fieldId}`}
              className="underline hover:text-destructive-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive-600 focus-visible:ring-offset-2"
            >
              {error.field}
            </a>
            {": "}
            <span>{error.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
