import { type ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  required,
  children,
  className,
}: FormFieldProps) {
  const errorId = `${htmlFor}-error`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-900">
        {label}
        {required && (
          <span className="ml-0.5 text-destructive-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={errorId}
          className="text-sm text-destructive-600"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
