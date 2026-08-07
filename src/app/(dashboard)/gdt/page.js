import GdtView from "@/features/gdt/components/GdtView";

export const metadata = {
  title: "GD&T",
  description:
    "ISO 2768 general tolerances for linear dimensions, angular dimensions, and geometrical tolerances.",
  keywords: [
    "GD&T",
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
