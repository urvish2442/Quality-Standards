"use client";

import { useState } from "react";
import LimitsAndFitsInfo from "@/features/limits-and-fits/components/LimitsAndFitsInfo";
import ToleranceCalculator from "@/features/limits-and-fits/components/ToleranceCalculator";

const TABS = [
  { id: "tolerance", label: "Tolerance" },
  { id: "info", label: "Info" },
];

const LimitsAndFitsView = () => {
  const [activeTab, setActiveTab] = useState("tolerance");

  return (
    <div className="flex w-full flex-col gap-3 sm:gap-6">
      <div
        className="border-border bg-surface inline-flex w-full max-w-xl rounded-2xl border p-0.5 shadow-(--card-shadow) sm:p-1"
        role="tablist"
        aria-label="Limits and Fits sections"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition sm:px-4 sm:py-2.5 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted hover:bg-primary-soft hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel">
        {activeTab === "tolerance" ? (
          <ToleranceCalculator />
        ) : (
          <LimitsAndFitsInfo />
        )}
      </div>
    </div>
  );
};

export default LimitsAndFitsView;
