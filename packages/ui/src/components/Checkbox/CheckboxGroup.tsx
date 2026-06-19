import { type ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface CheckboxGroupProps {
  legend: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function CheckboxGroup({
  legend,
  error,
  children,
  className,
}: CheckboxGroupProps) {
  return (
    <fieldset className={cn("flex flex-col gap-2", className)}>
      <legend className="text-sm font-medium text-gray-900">{legend}</legend>
      {children}
      {error && (
        <p className="text-sm text-destructive-600" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
