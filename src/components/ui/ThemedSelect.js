"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const ThemedSelect = ({
  value,
  onChange,
  options,
  ariaLabel,
  id,
  placeholder = "Select an option",
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();
  const selected = options.find(
    (option) => String(option.value) === String(value)
  );

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Automatically scroll selected option into view when dropdown opens
  useEffect(() => {
    if (open && listRef.current) {
      const selectedEl = listRef.current.querySelector('[aria-selected="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [open]);

  const selectOption = (nextValue) => {
    onChange(String(nextValue));
    setOpen(false);
  };

  const toggleOpen = () => {
    setOpen((current) => !current);
  };

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        id={id}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={toggleOpen}
        className="border-border bg-background text-foreground hover:border-primary/40 focus-visible:border-primary flex h-11 w-full items-center justify-between gap-2 rounded-xl border px-3 text-left text-sm transition outline-none"
      >
        <span className={`truncate ${selected ? "text-foreground font-medium" : "text-muted"}`}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`text-muted h-4 w-4 shrink-0 transition-transform duration-200 ${
            open ? "text-primary rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className="border-border bg-surface-elevated absolute z-50 mt-2 max-h-60 sm:max-h-72 w-full overflow-y-auto overscroll-contain rounded-xl border p-1 shadow-(--card-shadow) touch-pan-y"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {options.map((option) => {
            const isSelected = String(option.value) === String(value);

            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => selectOption(option.value)}
                  className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition select-none ${
                    isSelected
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-foreground hover:bg-primary-soft hover:text-foreground"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default ThemedSelect;
