"use client";

import { useState } from "react";
import { ROUGHNESS_GRADES } from "@/features/roughness/constants/roughnessData";

const RoughnessGrades = () => {
  const [highlighted, setHighlighted] = useState(null);

  return (
    <div className="flex flex-col gap-6">
      <section className="border-border bg-surface rounded-2xl border p-5 shadow-(--card-shadow) sm:p-6">
        <p className="bg-primary-soft text-primary mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
          Roughness grades
        </p>
        <h2 className="font-(family-name:--font-sora) text-2xl font-semibold tracking-tight sm:text-3xl">
          ISO N-grade reference (Ra / Rz)
        </h2>
        <p className="text-muted mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
          Preferred roughness grade numbers N1–N12 with companion Ra values. Rz
          values shown are the matching preferred series commonly paired with
          each grade for quick shop reference.
        </p>
      </section>

      <article className="border-border bg-surface overflow-hidden rounded-2xl border shadow-(--card-shadow)">
        <div className="border-border border-b px-5 py-4 sm:px-6">
          <h3 className="font-(family-name:--font-sora) text-lg font-semibold sm:text-xl">
            Grade table
          </h3>
          <p className="text-muted mt-1 text-sm">
            Click a grade row to highlight it. Ra values shown in μm and μin.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-background/80 text-muted text-xs tracking-[0.08em]">
              <tr>
                <th className="px-5 py-3 font-semibold uppercase sm:px-6">
                  Grade
                </th>
                <th className="px-5 py-3 font-semibold sm:px-6">
                  <span className="uppercase">Ra</span>{" "}
                  <span className="normal-case font-medium text-muted">
                    (μm)
                  </span>
                </th>
                <th className="px-5 py-3 font-semibold sm:px-6">
                  <span className="uppercase">Ra</span>{" "}
                  <span className="normal-case font-medium text-muted">
                    (μin)
                  </span>
                </th>
                <th className="px-5 py-3 font-semibold sm:px-6">
                  <span className="uppercase">Rz</span>{" "}
                  <span className="normal-case font-medium text-muted">
                    (approx. μm)
                  </span>
                </th>
                <th className="px-5 py-3 font-semibold uppercase sm:px-6">
                  Typical finish
                </th>
              </tr>
            </thead>
            <tbody>
              {ROUGHNESS_GRADES.map((row) => {
                const isHighlighted = highlighted === row.grade;

                return (
                  <tr
                    key={row.grade}
                    className={`border-border cursor-pointer border-t transition-colors ${
                      isHighlighted
                        ? "bg-primary-soft"
                        : "hover:bg-primary-soft/40"
                    }`}
                    onClick={() =>
                      setHighlighted((current) =>
                        current === row.grade ? null : row.grade
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
                    <td className="text-primary px-5 py-3 font-mono sm:px-6">
                      {row.ra}
                    </td>
                    <td className="text-primary px-5 py-3 font-mono sm:px-6">
                      {row.raInch}
                    </td>
                    <td className="px-5 py-3 font-mono sm:px-6">{row.rz}</td>
                    <td className="text-muted px-5 py-3 sm:px-6">
                      {row.finish}
                    </td>
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
