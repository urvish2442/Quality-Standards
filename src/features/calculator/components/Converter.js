"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import WarningMessage from "@/features/calculator/components/WarningMessage";
import {
  convertInchesToMm,
  decimalDegreesToDms,
  dmsToDecimalDegrees,
} from "@/features/calculator/utils/conversions";

const MODES = [
  { id: "length", label: "Length converter" },
  { id: "angle", label: "Angle converter" },
];

const LengthConverter = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const result = useMemo(
    () => convertInchesToMm({ input1, input2 }),
    [input1, input2]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Input 1 (inch)</span>
          <NumberInput
            step="any"
            value={input1}
            onChange={(event) => setInput1(event.target.value)}
            className="border-border bg-background focus:border-primary h-11 w-full rounded-xl border px-3 text-sm transition outline-none"
            placeholder="e.g. 0.995"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Input 2 (inch)</span>
          <NumberInput
            step="any"
            value={input2}
            onChange={(event) => setInput2(event.target.value)}
            className="border-border bg-background focus:border-primary h-11 w-full rounded-xl border px-3 text-sm transition outline-none"
            placeholder="e.g. 1.005"
          />
        </label>
      </div>

      <div className="border-border bg-background rounded-xl border p-4">
        <p className="text-muted text-xs font-semibold tracking-[0.12em] uppercase">
          Result (mm)
        </p>
        {result.error ? (
          <WarningMessage className="mt-2">{result.error}</WarningMessage>
        ) : (
          <p className="text-primary mt-1 font-(family-name:--font-sora) text-2xl font-semibold">
            {result.display}
          </p>
        )}
        <p className="text-muted mt-2 text-xs">
          1 in = 25.4 mm. One value → direct conversion. Two values → nominal ±
          tolerance from the mid-point.
        </p>
      </div>
    </div>
  );
};

const AngleConverter = () => {
  const [decimal, setDecimal] = useState("");
  const [degrees, setDegrees] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const dmsResult = useMemo(() => decimalDegreesToDms(decimal), [decimal]);
  const decimalResult = useMemo(
    () => dmsToDecimalDegrees({ degrees, minutes, seconds }),
    [degrees, minutes, seconds]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="border-border bg-background rounded-xl border p-4">
        <h3 className="font-(family-name:--font-sora) text-base font-semibold">
          Decimal degrees → DMS
        </h3>
        <label className="mt-4 block">
          <span className="mb-1 block text-sm font-medium">
            Decimal degrees
          </span>
          <NumberInput
            step="any"
            value={decimal}
            onChange={(event) => {
              setDecimal(event.target.value);
            }}
            className="border-border bg-surface focus:border-primary h-11 w-full rounded-xl border px-3 text-sm transition outline-none"
            placeholder="e.g. 12.505"
          />
        </label>

        <div className="border-border bg-surface mt-4 rounded-xl border p-3">
          <p className="text-muted text-xs font-semibold tracking-[0.12em] uppercase">
            Degrees ° Minutes ′ Seconds ″
          </p>
          {dmsResult.error ? (
            <WarningMessage className="mt-2">{dmsResult.error}</WarningMessage>
          ) : (
            <p className="text-primary mt-1 font-(family-name:--font-sora) text-xl font-semibold">
              {dmsResult.display}
            </p>
          )}
        </div>
      </div>

      <div className="border-border bg-background rounded-xl border p-4">
        <h3 className="font-(family-name:--font-sora) text-base font-semibold">
          DMS → Decimal degrees
        </h3>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <label className="block min-w-0">
            <span className="mb-1 block text-sm font-medium">Degrees</span>
            <NumberInput
              step="any"
              value={degrees}
              onChange={(event) => {
                setDegrees(event.target.value);
              }}
              className="border-border bg-surface focus:border-primary h-11 w-full rounded-xl border px-2.5 text-sm transition outline-none sm:px-3"
              placeholder="12"
            />
          </label>
          <label className="block min-w-0">
            <span className="mb-1 block text-sm font-medium">Minutes</span>
            <NumberInput
              min="0"
              max="59.999"
              step="any"
              value={minutes}
              onChange={(event) => {
                setMinutes(event.target.value);
              }}
              className="border-border bg-surface focus:border-primary h-11 w-full rounded-xl border px-2.5 text-sm transition outline-none sm:px-3"
              placeholder="30"
            />
          </label>
          <label className="block min-w-0">
            <span className="mb-1 block text-sm font-medium">Seconds</span>
            <NumberInput
              min="0"
              max="59"
              step="1"
              value={seconds}
              onChange={(event) => {
                setSeconds(event.target.value);
              }}
              className="border-border bg-surface focus:border-primary h-11 w-full rounded-xl border px-2.5 text-sm transition outline-none sm:px-3"
              placeholder="18"
            />
          </label>
        </div>

        <div className="border-border bg-surface mt-4 rounded-xl border p-3">
          <p className="text-muted text-xs font-semibold tracking-[0.12em] uppercase">
            Decimal degrees
          </p>
          {decimalResult.error ? (
            <WarningMessage className="mt-2">
              {decimalResult.error}
            </WarningMessage>
          ) : (
            <p className="text-primary mt-1 font-(family-name:--font-sora) text-xl font-semibold">
              {decimalResult.display}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Converter = () => {
  const [mode, setMode] = useState("length");

  return (
    <div className="flex flex-col gap-6">
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
          Converter
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight">
          Length and angle unit converter
        </h2>
        <p className="text-muted mt-2 max-w-3xl text-sm">
          Convert inches to millimetres, or switch between decimal degrees and
          degrees–minutes–seconds.
        </p>
      </section>

      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">Converter type</legend>
          <div className="flex flex-wrap gap-4" role="radiogroup">
            {MODES.map((item) => (
              <label
                key={item.id}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                  mode === item.id
                    ? "border-primary bg-primary-soft text-foreground"
                    : "border-border bg-background text-muted hover:bg-primary-soft hover:text-foreground"
                }`}
              >
                <input
                  type="radio"
                  name="converter-mode"
                  value={item.id}
                  checked={mode === item.id}
                  onChange={() => setMode(item.id)}
                  className="h-4 w-4 accent-[var(--primary)]"
                />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6">
          {mode === "length" ? <LengthConverter /> : <AngleConverter />}
        </div>
      </section>
    </div>
  );
};

export default Converter;
