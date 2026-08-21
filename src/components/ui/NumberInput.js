const INTEGER_STEP = "1";
const INTEGER_VALUE_PATTERN = /^-?\d*$/;
const DECIMAL_VALUE_PATTERN = /^-?\d*\.?\d*$/;

const NumberInput = ({
  inputMode,
  step = "any",
  enterKeyHint = "done",
  autoComplete = "off",
  onChange,
  ...props
}) => {
  const isInteger = String(step) === INTEGER_STEP;
  const resolvedInputMode = inputMode ?? (isInteger ? "numeric" : "decimal");
  const valuePattern = isInteger
    ? INTEGER_VALUE_PATTERN
    : DECIMAL_VALUE_PATTERN;

  const handleChange = (event) => {
    const normalized = event.target.value.replaceAll(",", ".");

    if (normalized !== "" && !valuePattern.test(normalized)) {
      return;
    }

    if (event.target.value !== normalized) {
      event.target.value = normalized;
    }

    onChange?.(event);
  };

  return (
    <input
      {...props}
      type="text"
      inputMode={resolvedInputMode}
      step={step}
      enterKeyHint={enterKeyHint}
      autoComplete={autoComplete}
      onChange={handleChange}
    />
  );
};

export default NumberInput;
