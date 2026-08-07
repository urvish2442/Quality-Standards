"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants/navigation";
import NavIcon from "@/components/icons/NavIcon";

const Sidebar = ({ collapsed, mobileOpen, onCloseMobile }) => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/50 transition-opacity lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 lg:sticky lg:top-0 ${
          collapsed ? "lg:w-[5.25rem]" : "lg:w-72"
        } ${mobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full lg:translate-x-0"}`}
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
            QS
          </div>
          <div
            className={`min-w-0 overflow-hidden transition-all ${
              collapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
            }`}
          >
            <p className="font-(family-name:--font-sora) text-sm font-semibold tracking-tight">
              Quality Standards
            </p>
            <p className="truncate text-xs text-sidebar-muted">
              Engineering reference
            </p>
          </div>
          <button
            type="button"
            className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg text-sidebar-muted hover:bg-white/10 hover:text-sidebar-foreground lg:hidden"
            onClick={onCloseMobile}
            aria-label="Close navigation"
          >
            <NavIcon name="close" className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p
            className={`mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-sidebar-muted ${
              collapsed ? "lg:text-center lg:px-0" : ""
            }`}
          >
            {collapsed ? "QS" : "Standards"}
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.disabled) {
                return (
                  <li key={item.id}>
                    <span
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-muted/70 ${
                        collapsed ? "lg:justify-center lg:px-2" : ""
                      }`}
                      title="Coming soon"
                    >
                      <NavIcon name={item.icon} className="h-5 w-5 shrink-0" />
                      <span
                        className={`flex min-w-0 flex-1 items-center justify-between gap-2 ${
                          collapsed ? "lg:hidden" : ""
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                          Soon
                        </span>
                      </span>
                    </span>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      collapsed ? "lg:justify-center lg:px-2" : ""
                    } ${
                      isActive
                        ? "bg-sidebar-active/20 font-semibold text-sidebar-active"
                        : "text-sidebar-foreground/85 hover:bg-white/10 hover:text-white"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    title={collapsed ? item.label : undefined}
                  >
                    <NavIcon name={item.icon} className="h-5 w-5 shrink-0" />
                    <span className={collapsed ? "lg:hidden" : ""}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className={`border-t border-white/10 p-4 text-xs text-sidebar-muted ${
            collapsed ? "lg:hidden" : ""
          }`}
        >
          <p>ISO · ASME · DIN reference hub</p>
          <p className="mt-1.5">
            by{" "}
            <span className="font-semibold text-primary">
              Urvish Rupareliya
            </span>
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
