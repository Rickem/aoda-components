import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id"> {
  label: string;
  indeterminate?: boolean;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, indeterminate = false, error, disabled, ...props }, ref) => {
    const id = useId();
    const internalRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div className="flex items-start gap-2">
        <input
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          id={id}
          type="checkbox"
          className={cn(
            "mt-0.5 h-4 w-4 rounded border-gray-300 text-primary-600",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive-600",
            className
          )}
          disabled={disabled}
          aria-checked={indeterminate ? "mixed" : undefined}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "text-sm text-gray-900",
            disabled && "opacity-50"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
