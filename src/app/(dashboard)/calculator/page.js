import { Suspense } from "react";
import CalculatorView from "@/features/calculator/components/CalculatorView";

export const metadata = {
  title: "Calculator",
  description:
    "Converters, position deviation, triangle solver, and pitch circle diameter (PCD) calculator for quality inspection.",
  keywords: [
    "position calculator",
    "angle calculator",
    "triangle solver",
    "PCD calculator",
    "pitch circle diameter",
    "inch to mm",
    "DMS converter",
    "deviation",
    "metrology",
  ],
};

const CalculatorPage = () => {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-border bg-surface p-6 text-sm text-muted shadow-(--card-shadow)">
          Loading calculator…
        </div>
      }
    >
      <CalculatorView />
    </Suspense>
  );
};

export default CalculatorPage;
