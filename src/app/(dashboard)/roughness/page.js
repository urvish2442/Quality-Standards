import RoughnessView from "@/features/roughness/components/RoughnessView";

export const metadata = {
  title: "Roughness",
  description:
    "Surface roughness reference for Ra/Rz parameters, ISO N-grades, and typical manufacturing process finishes.",
  keywords: [
    "surface roughness",
    "Ra",
    "Rz",
    "ISO 1302",
    "ISO 4287",
    "N grade",
    "surface finish",
    "ASME B46.1",
  ],
};

const RoughnessPage = () => {
  return <RoughnessView />;
};

export default RoughnessPage;
