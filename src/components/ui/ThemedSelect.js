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
  const listId = useId();
  const selected = options.find((option) => String(option.value) === String(value));

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

  const selectOption = (event, nextValue) => {
    event.preventDefault();
    event.stopPropagation();
    onChange(String(nextValue));
    setOpen(false);
  };

  const toggleOpen = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen((current) => !current);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={toggleOpen}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-border bg-background px-3 text-left text-sm text-foreground outline-none transition hover:border-primary/40 focus-visible:border-primary"
      >
        <span className={selected ? "text-foreground" : "text-muted"}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180 text-primary" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute z-30 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-border bg-surface-elevated p-1 shadow-(--card-shadow)"
        >
          {options.map((option) => {
            const isSelected = String(option.value) === String(value);

            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onPointerDown={(event) => {
                    if (event.button !== 0) {
                      return;
                    }

                    selectOption(event, option.value);
                  }}
                  onClick={(event) => selectOption(event, option.value)}
                  className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-primary-soft hover:text-foreground"
                  }`}
                >
                  {option.label}
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
