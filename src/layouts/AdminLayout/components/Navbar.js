"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { NAV_ITEMS } from "@/constants/navigation";
import NavIcon from "@/components/icons/NavIcon";
import ThemeToggle from "@/layouts/AdminLayout/components/ThemeToggle";

const Navbar = ({ collapsed, onToggleSidebar, onOpenMobile }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = NAV_ITEMS.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  const activeChild =
    current?.children?.find((child) => {
      const tab = new URL(child.href, "http://local").searchParams.get("tab");
      const currentTab = searchParams.get("tab") ?? "converter";
      return tab === currentTab;
    }) ?? null;

  const title = activeChild
    ? `${current.label} · ${activeChild.label}`
    : (current?.label ?? "Overview");

  return (
    <header className="border-border bg-navbar/90 sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        className="border-border bg-surface text-foreground hover:bg-primary-soft inline-flex h-10 w-10 items-center justify-center rounded-xl border lg:hidden"
        onClick={onOpenMobile}
        aria-label="Open navigation"
      >
        <NavIcon name="menu" className="h-5 w-5" />
      </button>

      <button
        type="button"
        className="border-border bg-surface text-foreground hover:bg-primary-soft hidden h-10 w-10 items-center justify-center rounded-xl border lg:inline-flex"
        onClick={onToggleSidebar}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <NavIcon name="panel" className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <p className="text-muted truncate text-xs font-medium tracking-[0.12em] uppercase">
          Quality Standards
        </p>
        <h1 className="truncate font-(family-name:--font-sora) text-base font-semibold tracking-tight sm:text-lg">
          {title}
        </h1>
      </div>

      <ThemeToggle />
    </header>
  );
};

export default Navbar;
