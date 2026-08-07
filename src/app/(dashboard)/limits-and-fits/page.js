import LimitsAndFitsView from "@/features/limits-and-fits/components/LimitsAndFitsView";

export const metadata = {
  title: "Limits and Fits",
  description:
    "ISO 286 limits and fits reference: hole/shaft basis, fit classes, common pairs, and IT grades.",
  keywords: [
    "limits and fits",
    "ISO 286",
    "H7/g6",
    "clearance fit",
    "interference fit",
    "tolerance grades",
  ],
};

const LimitsAndFitsPage = () => {
  return <LimitsAndFitsView />;
};

export default LimitsAndFitsPage;
