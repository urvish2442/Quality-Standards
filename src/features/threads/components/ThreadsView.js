"use client";

import { useState } from "react";
import MetricThreadsView from "@/features/threads/components/MetricThreadsView";
import BritishThreadsView from "@/features/threads/components/BritishThreadsView";
import UnThreadsView from "@/features/threads/components/UnThreadsView";
import BspThreadsView from "@/features/threads/components/BspThreadsView";
import ThreadCitations from "@/features/threads/components/ThreadCitations";
import { THREAD_CITATIONS } from "@/features/threads/constants/threadsData";

const TABS = [
  { id: "metric", label: "Metric" },
  { id: "bswbsf", label: "BSW/BSF" },
  { id: "bsp", label: "BSP (G)" },
  { id: "un", label: "UN" },
];

const TAB_CONTENT = {
  metric: MetricThreadsView,
  bswbsf: BritishThreadsView,
  bsp: BspThreadsView,
  un: UnThreadsView,
};

const ThreadsView = () => {
  const [activeTab, setActiveTab] = useState("metric");
  const ActiveView = TAB_CONTENT[activeTab];

  return (
    <div className="flex w-full flex-col gap-6">
      <div
        className="inline-flex w-full max-w-2xl rounded-2xl border border-border bg-surface p-1 shadow-(--card-shadow)"
        role="tablist"
        aria-label="Thread standards"
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
              className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition sm:px-4 ${isActive
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
        <ActiveView />
      </div>

      <ThreadCitations citations={THREAD_CITATIONS} />
    </div>
  );
};

export default ThreadsView;
