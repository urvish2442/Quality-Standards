"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const INTEGER_STEP = "1";
const INTEGER_VALUE_PATTERN = /^-?\d*$/;
const DECIMAL_VALUE_PATTERN = /^-?\d*\.?\d*$/;

const NumberInput = forwardRef(
  (
    {
      inputMode,
      step = "any",
      enterKeyHint = "done",
      autoComplete = "off",
      onChange,
      className = "",
      value,
      defaultValue,
      name,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef(null);
    useImperativeHandle(ref, () => internalRef.current);

    const [internalValue, setInternalValue] = useState(defaultValue ?? "");

    const isInteger = String(step) === INTEGER_STEP;
    const resolvedInputMode = inputMode ?? (isInteger ? "numeric" : "decimal");
    const valuePattern = isInteger
      ? INTEGER_VALUE_PATTERN
      : DECIMAL_VALUE_PATTERN;

    const currentValue = value !== undefined ? value : internalValue;
    const hasValue =
      currentValue !== null &&
      currentValue !== undefined &&
      String(currentValue).trim() !== "";

    const handleChange = (event) => {
      const normalized = event.target.value.replaceAll(",", ".");

      if (normalized !== "" && !valuePattern.test(normalized)) {
        return;
      }

      if (event.target.value !== normalized) {
        event.target.value = normalized;
      }

      setInternalValue(normalized);
      onChange?.(event);
    };

    const handleClear = (e) => {
      e.preventDefault();
      e.stopPropagation();

      setInternalValue("");

      if (internalRef.current) {
        internalRef.current.value = "";
        internalRef.current.focus();

        const syntheticEvent = {
          target: internalRef.current,
          currentTarget: internalRef.current,
          preventDefault: () => {},
          stopPropagation: () => {},
        };

        onChange?.(syntheticEvent);
      }
    };

    return (
      <div className="relative flex w-full items-center">
        <input
          ref={internalRef}
          {...props}
          name={name}
          value={value}
          defaultValue={defaultValue}
          type="text"
          inputMode={resolvedInputMode}
          step={step}
          enterKeyHint={enterKeyHint}
          autoComplete={autoComplete}
          onChange={handleChange}
          className={`${className} ${hasValue ? "pr-8 sm:pr-3" : ""}`.trim()}
        />
        {hasValue && (
          <button
            type="button"
            tabIndex={-1}
            onClick={handleClear}
            aria-label="Clear input"
            className="bg-muted/20 text-muted-foreground hover:bg-muted hover:text-foreground absolute right-2.5 flex h-6 w-6 items-center justify-center rounded-full transition active:scale-95 sm:hidden"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
