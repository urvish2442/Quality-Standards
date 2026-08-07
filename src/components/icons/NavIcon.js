import {
  Activity,
  Calculator,
  CircleDot,
  Columns2,
  Crosshair,
  Cylinder,
  Home,
  Menu,
  Monitor,
  Moon,
  PanelLeft,
  Ruler,
  Waves,
  Sun,
  X,
  ChevronRight,
} from "lucide-react";

const ICON_MAP = {
  home: Home,
  hole: CircleDot,
  shaft: Cylinder,
  fit: Columns2,
  dimension: Ruler,
  thread: Waves,
  gdt: Crosshair,
  roughness: Activity,
  calculator: Calculator,
  menu: Menu,
  close: X,
  sun: Sun,
  moon: Moon,
  system: Monitor,
  chevron: ChevronRight,
  panel: PanelLeft,
};

const NavIcon = ({ name, className = "h-5 w-5", strokeWidth = 1.75 }) => {
  const Icon = ICON_MAP[name];

  if (!Icon) {
    return null;
  }

  return (
    <Icon
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  );
};

export default NavIcon;
