"use client";

import { useState } from "react";
import { HARDNESS_CONVERSIONS } from "@/features/hardness/constants/hardnessData";

const HardnessConversion = () => {
  const [highlighted, setHighlighted] = useState(null);

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
        <p className="mb-2 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Approximate conversion
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          HB · HV · HRB · HRC lookup
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          Rounded shop-reference conversions for carbon and alloy steels.
          Values are approximate — use ASTM E140 / ISO tables for acceptance,
          and measure in the specified scale when possible.
        </p>
      </section>

      <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-(--card-shadow)">
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <h3 className="font-(family-name:--font-sora) text-lg font-semibold sm:text-xl">
            Conversion table
          </h3>
          <p className="mt-1 text-sm text-muted">
            Click a row to highlight it. Em dashes mean the scale is outside
            the usual range.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-background/80 text-xs uppercase tracking-[0.08em] text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold sm:px-6">HB</th>
                <th className="px-5 py-3 font-semibold sm:px-6">HV</th>
                <th className="px-5 py-3 font-semibold sm:px-6">HRB</th>
                <th className="px-5 py-3 font-semibold sm:px-6">HRC</th>
              </tr>
            </thead>
            <tbody>
              {HARDNESS_CONVERSIONS.map((row) => {
                const rowKey = `${row.hb}-${row.hv}`;
                const isHighlighted = highlighted === rowKey;

                return (
                  <tr
                    key={rowKey}
                    className={`cursor-pointer border-t border-border transition-colors ${
                      isHighlighted
                        ? "bg-primary-soft"
                        : "hover:bg-primary-soft/40"
                    }`}
                    onClick={() =>
                      setHighlighted((current) =>
                        current === rowKey ? null : rowKey,
                      )
                    }
                  >
                    <td
                      className={`px-5 py-3 font-mono font-semibold sm:px-6 ${
                        isHighlighted ? "text-primary" : ""
                      }`}
                    >
                      {row.hb}
                    </td>
                    <td className="px-5 py-3 font-mono text-primary sm:px-6">
                      {row.hv}
                    </td>
                    <td className="px-5 py-3 font-mono sm:px-6">{row.hrb}</td>
                    <td className="px-5 py-3 font-mono sm:px-6">{row.hrc}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
};

export default HardnessConversion;
