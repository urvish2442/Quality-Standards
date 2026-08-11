"use client";

import { useState } from "react";
import HardnessBasics from "@/features/hardness/components/HardnessBasics";
import HardnessConversion from "@/features/hardness/components/HardnessConversion";
import HardnessMaterials from "@/features/hardness/components/HardnessMaterials";
import HardnessCitations from "@/features/hardness/components/HardnessCitations";

const TABS = [
  { id: "basics", label: "Basics" },
  { id: "conversion", label: "Conversion" },
  { id: "materials", label: "Materials" },
];

const HardnessView = () => {
  const [activeTab, setActiveTab] = useState("basics");

  let panel = <HardnessBasics />;

  if (activeTab === "conversion") {
    panel = <HardnessConversion />;
  } else if (activeTab === "materials") {
    panel = <HardnessMaterials />;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div
        className="inline-flex w-full max-w-xl rounded-2xl border border-border bg-surface p-1 shadow-(--card-shadow)"
        role="tablist"
        aria-label="Hardness sections"
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

      <div role="tabpanel">{panel}</div>

      <HardnessCitations />
    </div>
  );
};

export default HardnessView;
