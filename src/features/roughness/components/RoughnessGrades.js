"use client";

import { useState } from "react";
import { ROUGHNESS_GRADES } from "@/features/roughness/constants/roughnessData";

const RoughnessGrades = () => {
  const [highlighted, setHighlighted] = useState(null);

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-border bg-surface p-5 shadow-(--card-shadow) sm:p-6">
        <p className="mb-2 inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Roughness grades
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          ISO N-grade reference (Ra / Rz)
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          Preferred roughness grade numbers N1–N12 with companion Ra values.
          Rz values shown are the matching preferred series commonly paired with
          each grade for quick shop reference.
        </p>
      </section>

      <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-(--card-shadow)">
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <h3 className="font-(family-name:--font-sora) text-lg font-semibold sm:text-xl">
            Grade table
          </h3>
          <p className="mt-1 text-sm text-muted">
            Click a grade row to highlight it. Values in μm.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-background/80 text-xs uppercase tracking-[0.08em] text-muted">
              <tr>
                <th className="px-5 py-3 font-semibold sm:px-6">Grade</th>
                <th className="px-5 py-3 font-semibold sm:px-6">Ra</th>
                <th className="px-5 py-3 font-semibold sm:px-6">Rz (approx.)</th>
                <th className="px-5 py-3 font-semibold sm:px-6">Typical finish</th>
              </tr>
            </thead>
            <tbody>
              {ROUGHNESS_GRADES.map((row) => {
                const isHighlighted = highlighted === row.grade;

                return (
                  <tr
                    key={row.grade}
                    className={`cursor-pointer border-t border-border transition-colors ${
                      isHighlighted
                        ? "bg-primary-soft"
                        : "hover:bg-primary-soft/40"
                    }`}
                    onClick={() =>
                      setHighlighted((current) =>
                        current === row.grade ? null : row.grade,
                      )
                    }
                  >
                    <td
                      className={`px-5 py-3 font-semibold sm:px-6 ${
                        isHighlighted ? "text-primary" : ""
                      }`}
                    >
                      {row.grade}
                    </td>
                    <td className="px-5 py-3 font-mono text-primary sm:px-6">
                      {row.ra}
                    </td>
                    <td className="px-5 py-3 font-mono sm:px-6">{row.rz}</td>
                    <td className="px-5 py-3 text-muted sm:px-6">{row.finish}</td>
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

export default RoughnessGrades;
