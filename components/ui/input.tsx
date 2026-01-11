import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/core/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  error?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, error, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className="w-full">
        <div className="relative group w-full">
          {startIcon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2  transition-colors",
                hasError ? "text-red-500" : "text-slate-800",
                // "group-focus-within:text-accent" // Focus state takes priority
                // "group-focus-within:text-accent" // Focus state takes priority
              )}
            >
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-full  bg-transparent py-2 text-sm transition-colors",
              "placeholder:text-muted-foreground",
              // Conditional border colors
              hasError
                ? "border-red-500 focus:border-primary focus:border-2"
                : "",
              "focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              // Correctly apply padding to prevent icon overlap
              startIcon ? "pl-9" : "pl-3",
              endIcon ? "pr-10" : "pr-3",
              className
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2  transition-colors",
                hasError ? "text-red-500" : "text-slate-500",
                "group-focus-within:text-primary"
              )}
            >
              {endIcon}
            </div>
          )}
        </div>

        {/* Animated Error Message */}
        <AnimatePresence>
          {hasError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="mt-1.5 text-xs font-medium text-red-500"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Input.displayName = "Input";
export { Input };
export default Input;