import HardnessView from "@/features/hardness/components/HardnessView";

export const metadata = {
  title: "Hardness",
  description:
    "Material hardness reference for Brinell, Vickers, and Rockwell scales, approximate conversions, and typical material ranges.",
  keywords: [
    "hardness",
    "Brinell",
    "Vickers",
    "Rockwell",
    "HRC",
    "HRB",
    "HB",
    "HV",
    "ASTM E140",
    "ISO 6508",
  ],
};

const HardnessPage = () => {
  return <HardnessView />;
};

export default HardnessPage;
