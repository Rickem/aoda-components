import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../lib/utils";

// Context to pass the radio group `name` down to RadioOption children.
const RadioGroupContext = createContext<string | undefined>(undefined);

export interface RadioGroupProps {
  legend: string;
  name: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function RadioGroup({
  legend,
  name,
  error,
  children,
  className,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={name}>
      <fieldset role="radiogroup" className={cn("flex flex-col gap-2", className)}>
        <legend className="text-sm font-medium text-gray-900">{legend}</legend>
        <div className="flex flex-col gap-1.5">{children}</div>
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

export interface RadioOptionProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id"> {
  label: string;
  value: string;
}

export const RadioOption = forwardRef<HTMLInputElement, RadioOptionProps>(
  ({ className, label, name: nameProp, ...props }, ref) => {
    const id = useId();
    const contextName = useContext(RadioGroupContext);
    // Prefer explicit name prop; fall back to group context.
    const name = nameProp ?? contextName;

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          id={id}
          type="radio"
          name={name}
          className={cn(
            "h-4 w-4 border-gray-300 text-primary-600",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <label htmlFor={id} className="text-sm text-gray-900">
          {label}
        </label>
      </div>
    );
  }
);

RadioOption.displayName = "RadioOption";
