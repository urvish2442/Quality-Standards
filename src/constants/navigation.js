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
    description: "Metric, British Whitworth, Unified (UN), and BSP (G) thread specs",
  },
  {
    id: "calculator",
    label: "Calculator",
    href: "/calculator",
    icon: "calculator",
    description: "Position deviation and triangle angle calculator",
  },
  {
    id: "roughness",
    label: "Roughness",
    href: "/roughness",
    icon: "roughness",
    description: "Surface finish and Ra/Rz values",
    disabled: true,
  },
];

export const STANDARD_CARDS = NAV_ITEMS.filter((item) => item.id !== "overview");
