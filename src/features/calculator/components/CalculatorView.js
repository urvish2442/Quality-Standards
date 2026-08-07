"use client";

import { useState } from "react";
import PositionCalculator from "@/features/calculator/components/PositionCalculator";
import AngleCalculator from "@/features/calculator/components/AngleCalculator";
import Converter from "@/features/calculator/components/Converter";

const TABS = [
  { id: "converter", label: "Converter" },
  { id: "position", label: "Position" },
  { id: "angle", label: "Triangle Solver" },
];

const CalculatorView = () => {
  const [activeTab, setActiveTab] = useState("converter");

  return (
    <div className="flex w-full flex-col gap-6">
      <div
        className="inline-flex w-full max-w-2xl rounded-2xl border border-border bg-surface p-1 shadow-(--card-shadow)"
        role="tablist"
        aria-label="Calculator sections"
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
              className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition sm:px-4 ${
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
        {activeTab === "position" ? (
          <PositionCalculator />
        ) : activeTab === "angle" ? (
          <AngleCalculator />
        ) : (
          <Converter />
        )}
      </div>
    </div>
  );
};

export default CalculatorView;
