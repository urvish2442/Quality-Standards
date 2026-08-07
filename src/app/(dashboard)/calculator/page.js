import CalculatorView from "@/features/calculator/components/CalculatorView";

export const metadata = {
  title: "Calculator",
  description:
    "Position deviation, triangle solver, and inch/mm plus angle DMS converters for quality inspection.",
  keywords: [
    "position calculator",
    "angle calculator",
    "triangle solver",
    "inch to mm",
    "DMS converter",
    "deviation",
    "metrology",
  ],
};

const CalculatorPage = () => {
  return <CalculatorView />;
};

export default CalculatorPage;
