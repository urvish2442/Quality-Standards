"use client";

import { useState } from "react";
import Iso2768Part1View from "@/features/gdt/components/Iso2768Part1View";
import Iso2768Part2View from "@/features/gdt/components/Iso2768Part2View";

const TABS = [
  { id: "2768-1", label: "2768-1 (Dimensions)" },
  { id: "2768-2", label: "2768-2 (Geo.)" },
];

const GdtView = () => {
  const [activeTab, setActiveTab] = useState("2768-1");

  return (
    <div className="flex w-full flex-col gap-6">
      <div
        className="inline-flex w-full max-w-xl rounded-2xl border border-border bg-surface p-1 shadow-(--card-shadow)"
        role="tablist"
        aria-label="GD&T sections"
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
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
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
        {activeTab === "2768-1" ? (
          <Iso2768Part1View />
        ) : (
          <Iso2768Part2View />
        )}
      </div>
    </div>
  );
};

export default GdtView;
