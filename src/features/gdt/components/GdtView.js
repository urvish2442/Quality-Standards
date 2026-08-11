"use client";

import { useState } from "react";
import Iso2768Part1View from "@/features/gdt/components/Iso2768Part1View";
import Iso2768Part2View from "@/features/gdt/components/Iso2768Part2View";
import GdtInfoView from "@/features/gdt/components/GdtInfoView";

const TABS = [
  { id: "info", label: "Info" },
  { id: "2768-1", label: "2768-1 (Dimensions)" },
  { id: "2768-2", label: "2768-2 (Geo.)" },
];

const GdtView = () => {
  const [activeTab, setActiveTab] = useState("info");

  let panel = <GdtInfoView />;

  if (activeTab === "2768-1") {
    panel = <Iso2768Part1View />;
  } else if (activeTab === "2768-2") {
    panel = <Iso2768Part2View />;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div
        className="inline-flex w-full max-w-2xl rounded-2xl border border-border bg-surface p-1 shadow-(--card-shadow)"
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

      <div role="tabpanel">{panel}</div>
    </div>
  );
};

export default GdtView;
