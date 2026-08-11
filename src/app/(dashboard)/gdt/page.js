import GdtView from "@/features/gdt/components/GdtView";

export const metadata = {
  title: "GD&T",
  description:
    "GD&T symbol guide plus ISO 2768 general tolerances for linear, angular, and geometrical characteristics.",
  keywords: [
    "GD&T",
    "GD&T symbols",
    "form tolerance",
    "position tolerance",
    "ISO 2768",
    "general tolerances",
    "linear dimensions",
    "geometrical tolerances",
    "straightness",
    "flatness",
    "perpendicularity",
  ],
};

const GdtPage = () => {
  return <GdtView />;
};

export default GdtPage;
