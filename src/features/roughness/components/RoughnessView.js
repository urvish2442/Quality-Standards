"use client";

import { useState } from "react";
import RoughnessBasics from "@/features/roughness/components/RoughnessBasics";
import RoughnessGrades from "@/features/roughness/components/RoughnessGrades";
import RoughnessProcesses from "@/features/roughness/components/RoughnessProcesses";
import RoughnessCitations from "@/features/roughness/components/RoughnessCitations";

const TABS = [
  { id: "basics", label: "Basics" },
  { id: "grades", label: "Grades" },
  { id: "processes", label: "Processes" },
];

const RoughnessView = () => {
  const [activeTab, setActiveTab] = useState("basics");

  let panel = <RoughnessBasics />;

  if (activeTab === "grades") {
    panel = <RoughnessGrades />;
  } else if (activeTab === "processes") {
    panel = <RoughnessProcesses />;
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div
        className="border-border bg-surface inline-flex w-full max-w-xl rounded-2xl border p-1 shadow-(--card-shadow)"
        role="tablist"
        aria-label="Roughness sections"
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

      <RoughnessCitations />
    </div>
  );
};

export default RoughnessView;
