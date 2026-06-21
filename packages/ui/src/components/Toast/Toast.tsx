import { type ReactNode } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "../../lib/utils";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  variant?: "info" | "success" | "error";
  duration?: number;
  action?: ToastAction;
}

const variantStyles: Record<NonNullable<ToastProps["variant"]>, string> = {
  info: "border-gray-200 bg-white",
  success: "border-green-200 bg-green-50",
  error: "border-red-200 bg-red-50",
};

export function Toast({
  open,
  onOpenChange,
  title,
  description,
  variant = "info",
  duration = 5000,
  action,
}: ToastProps) {
  // WCAG: role="alert" for errors (assertive), role="status" for informational (polite)
  // We place the role on an inner <div> because Radix renders Root as <li> (inside <ol>),
  // and axe disallows role="status"|"alert" on <li> elements.
  const liveRole = variant === "error" ? "alert" : "status";

  // Radix Toast accepts duration in ms; Infinity means the toast never auto-dismisses
  const radixDuration = duration === Infinity ? Number.POSITIVE_INFINITY : duration;

  return (
    <ToastPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      duration={radixDuration}
      className={cn(
        "rounded-lg border p-4 shadow-lg",
        variantStyles[variant]
      )}
    >
      {/* Inner div carries the live-region role so it lands on a <div>, not <li> */}
      <div role={liveRole} className="flex items-start gap-3">
        <div className="flex-1">
          <ToastPrimitive.Title className="text-sm font-semibold text-gray-900">
            {title}
          </ToastPrimitive.Title>
          {description && (
            <ToastPrimitive.Description className="mt-1 text-sm text-gray-600">
              {description}
            </ToastPrimitive.Description>
          )}
        </div>
        {action && (
          <ToastPrimitive.Action asChild altText={action.label}>
            <button
              onClick={action.onClick}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-sm font-medium",
                "bg-blue-600 text-white hover:bg-blue-700",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              )}
            >
              {action.label}
            </button>
          </ToastPrimitive.Action>
        )}
        <ToastPrimitive.Close
          className={cn(
            "shrink-0 rounded-sm p-1 text-gray-400 hover:text-gray-900",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          )}
          aria-label="Dismiss"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </ToastPrimitive.Close>
      </div>
    </ToastPrimitive.Root>
  );
}

export interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <ToastPrimitive.Provider>
      {children}
      {/*
       * Viewport renders as <ol>. We intentionally omit aria-label here because
       * axe flags aria-label on <ol> outside landmark roles as an error.
       * The live-region semantics are carried by the role="status"|"alert" divs inside each toast.
       */}
      <ToastPrimitive.Viewport
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      />
    </ToastPrimitive.Provider>
  );
}
