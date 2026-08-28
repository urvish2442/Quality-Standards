export const CALCULATOR_TABS = [
  {
    id: "converter",
    label: "Converter",
    href: "/calculator?tab=converter",
    icon: "converter",
  },
  {
    id: "position",
    label: "Position",
    href: "/calculator?tab=position",
    icon: "position",
  },
  {
    id: "pcd",
    label: "PCD",
    href: "/calculator?tab=pcd",
    icon: "pcd",
  },
  {
    id: "angle",
    label: "Triangle",
    href: "/calculator?tab=angle",
    icon: "triangle",
  },
];

export const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    href: "/",
    icon: "home",
  },
  {
    id: "gdt",
    label: "GD&T",
    href: "/gdt",
    icon: "gdt",
    description: "ISO 2768 general tolerances for dimensions and geometry",
  },
  {
    id: "limits-and-fits",
    label: "Limits and Fits",
    href: "/limits-and-fits",
    icon: "fit",
    description: "ISO 286 hole/shaft tolerances and fit classes",
  },
  {
    id: "threads",
    label: "Threads",
    href: "/threads",
    icon: "thread",
    description:
      "Metric, British Whitworth, Unified (UN), and BSP (G) thread specs",
  },
  {
    id: "calculator",
    label: "Calculator",
    href: "/calculator",
    icon: "calculator",
    description:
      "Converters, position, PCD, and triangle calculators for quality inspection",
    children: CALCULATOR_TABS,
  },
  {
    id: "roughness",
    label: "Roughness",
    href: "/roughness",
    icon: "roughness",
    description: "Surface finish grades, Ra/Rz parameters, and process ranges",
  },
  {
    id: "hardness",
    label: "Hardness",
    href: "/hardness",
    icon: "hardness",
    description:
      "Brinell, Vickers, and Rockwell scales with conversion and material ranges",
  },
];

export const STANDARD_CARDS = NAV_ITEMS.filter(
  (item) => item.id !== "overview"
);

export const getCalculatorTabId = (tab) => {
  const match = CALCULATOR_TABS.find((item) => item.id === tab);
  return match?.id ?? CALCULATOR_TABS[0].id;
};
