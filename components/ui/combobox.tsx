"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./button";
import { cn } from "@/core/lib/utils";

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Combobox({ options, value, onChange, placeholder = "Select an option..." }: ComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const comboboxRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <div className="relative w-fit select-none" ref={comboboxRef}>
      <Button
        variant="accent"
        role="combobox"
        size={'default'}
        type="button"
        aria-expanded={isOpen}
        className="w-fit justify-between font-normal !h-9"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? selectedLabel : placeholder}
        <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute left-0 z-10 mt-1 min-w-[200px] bg-white border border-slate-200 rounded-2xl shadow-sm"
          >
            <div className="p-1 space-y-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer w-full text-left flex items-center p-2 text-sm rounded-xl hover:bg-secondary/15 ${value === option.value && 'bg-primary/70 text-black hover:text-black pointer-events-none'}`}
                >
                  <Check className={cn("ml-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}