import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, required, disabled, ...props }, ref) => {
    const id = useId();
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const describedByIds = [
      error ? errorId : null,
      helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium text-gray-900",
            disabled && "opacity-50"
          )}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-red-600" aria-hidden="true">
              *
            </span>
          )}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(
            "rounded-md border px-3 py-2 text-sm text-gray-900",
            "placeholder:text-gray-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-600 focus-visible:ring-red-600"
              : "border-gray-300",
            className
          )}
          disabled={disabled}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedByIds || undefined}
          {...props}
        />
        {helperText && (
          <p id={helperId} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
