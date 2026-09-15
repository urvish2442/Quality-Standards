"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CALCULATOR_TABS, getCalculatorTabId } from "@/constants/navigation";
import PositionCalculator from "@/features/calculator/components/PositionCalculator";
import AngleCalculator from "@/features/calculator/components/AngleCalculator";
import Converter from "@/features/calculator/components/Converter";
import PcdCalculator from "@/features/calculator/components/PcdCalculator";
import WeightCalculator from "@/features/calculator/components/WeightCalculator";

const PANEL_MAP = {
  weight: WeightCalculator,
  converter: Converter,
  position: PositionCalculator,
  pcd: PcdCalculator,
  angle: AngleCalculator,
};

const CalculatorView = () => {
  const searchParams = useSearchParams();
  const activeTab = getCalculatorTabId(searchParams.get("tab"));
  const ActivePanel = PANEL_MAP[activeTab] ?? Converter;

  return (
    <div className="flex w-full flex-col gap-6">
      <div
        className="border-border bg-surface inline-flex w-full max-w-3xl rounded-2xl border p-1 shadow-(--card-shadow)"
        role="tablist"
        aria-label="Calculator sections"
      >
        {CALCULATOR_TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              role="tab"
              aria-selected={isActive}
              className={`flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-semibold transition sm:px-4 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted hover:bg-primary-soft hover:text-foreground"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div role="tabpanel">
        <ActivePanel />
      </div>
    </div>
  );
};

export default CalculatorView;
