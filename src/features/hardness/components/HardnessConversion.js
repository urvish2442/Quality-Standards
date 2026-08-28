"use client";

import { useState } from "react";
import { HARDNESS_CONVERSIONS } from "@/features/hardness/constants/hardnessData";

const HardnessConversion = () => {
  const [highlighted, setHighlighted] = useState(null);

  return (
    <div className="flex flex-col gap-6">
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
          Approximate conversion
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          HB · HV · HRB · HRC lookup
        </h2>
        <p className="text-muted mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
          Rounded shop-reference conversions for carbon and alloy steels. Values
          are approximate — use ASTM E140 / ISO tables for acceptance, and
          measure in the specified scale when possible.
        </p>
      </section>

      <article className="border-border bg-surface overflow-hidden rounded-2xl border shadow-(--card-shadow)">
        <div className="border-border border-b px-5 py-4 sm:px-6">
          <h3 className="font-(family-name:--font-sora) text-lg font-semibold sm:text-xl">
            Conversion table
          </h3>
          <p className="text-muted mt-1 text-sm">
            Click a row to highlight it. Em dashes mean the scale is outside the
            usual range.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-background/80 text-muted text-xs tracking-[0.08em] uppercase">
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
                    className={`border-border cursor-pointer border-t transition-colors ${
                      isHighlighted
                        ? "bg-primary-soft"
                        : "hover:bg-primary-soft/40"
                    }`}
                    onClick={() =>
                      setHighlighted((current) =>
                        current === rowKey ? null : rowKey
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
                    <td className="text-primary px-5 py-3 font-mono sm:px-6">
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
