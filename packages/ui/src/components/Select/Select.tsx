import { useId } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "../../lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  placeholder = "Select an option",
  error,
  required,
  options,
  value,
  defaultValue,
  onValueChange,
  disabled,
  className,
}: SelectProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const labelId = `${id}-label`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        id={labelId}
        className={cn(
          "text-sm font-medium text-gray-900",
          disabled && "opacity-50"
        )}
      >
        {label}
        {required && (
          <span className="ml-0.5 text-destructive-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-destructive-600 focus-visible:ring-destructive-600"
              : "border-gray-300"
          )}
          aria-labelledby={labelId}
          aria-invalid={error ? true : undefined}
          aria-required={required || undefined}
          aria-describedby={error ? errorId : undefined}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm text-gray-900",
                    "focus:bg-primary-50 focus:outline-none",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  )}
                >
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && (
        <p id={errorId} className="text-sm text-destructive-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
