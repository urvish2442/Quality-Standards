"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { NAV_ITEMS } from "@/constants/navigation";
import NavIcon from "@/components/icons/NavIcon";

const isItemActive = (item, pathname, searchParams) => {
  if (item.href === "/") {
    return pathname === "/";
  }

  if (!pathname.startsWith(item.href.split("?")[0])) {
    return false;
  }

  if (item.href.includes("?tab=")) {
    const tab = new URL(item.href, "http://local").searchParams.get("tab");
    return (
      searchParams.get("tab") === tab ||
      (!searchParams.get("tab") && tab === "converter")
    );
  }

  return true;
};

const NavLink = ({
  item,
  pathname,
  searchParams,
  collapsed,
  onCloseMobile,
  nested = false,
}) => {
  const isActive = isItemActive(item, pathname, searchParams);

  return (
    <Link
      href={item.href}
      onClick={onCloseMobile}
      className={`flex items-center gap-3 rounded-xl text-sm transition-colors ${
        nested ? "px-3 py-2" : "px-3 py-2.5"
      } ${collapsed && !nested ? "lg:justify-center lg:px-2" : ""} ${
        isActive
          ? "bg-sidebar-active/20 text-sidebar-active font-semibold"
          : "text-sidebar-foreground/85 hover:bg-white/10 hover:text-white"
      }`}
      aria-current={isActive ? "page" : undefined}
      title={collapsed ? item.label : undefined}
    >
      <NavIcon
        name={item.icon}
        className={nested ? "h-4 w-4 shrink-0" : "h-5 w-5 shrink-0"}
      />
      <span className={collapsed && !nested ? "lg:hidden" : ""}>
        {item.label}
      </span>
    </Link>
  );
};

const Sidebar = ({ collapsed, mobileOpen, onCloseMobile }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openGroups, setOpenGroups] = useState({});

  useEffect(() => {
    const nextOpen = {};

    NAV_ITEMS.forEach((item) => {
      if (item.children?.length) {
        const groupActive = item.children.some((child) =>
          isItemActive(child, pathname, searchParams)
        );
        const parentActive = pathname.startsWith(item.href);
        nextOpen[item.id] = groupActive || parentActive;
      }
    });

    setOpenGroups((current) => ({ ...current, ...nextOpen }));
  }, [pathname, searchParams]);

  const toggleGroup = (id) => {
    setOpenGroups((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

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
        className={`bg-sidebar text-sidebar-foreground fixed inset-y-0 left-0 z-50 flex h-screen flex-col transition-all duration-300 lg:sticky lg:top-0 ${
          collapsed ? "lg:w-[5.25rem]" : "lg:w-72"
        } ${mobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full lg:translate-x-0"}`}
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <div
            className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl text-sm font-bold tracking-wide text-white shadow-[0_8px_18px_-6px_rgba(15,118,110,0.7)] ring-1 ring-white/20"
            style={{
              backgroundImage:
                "linear-gradient(145deg, #2dd4bf 0%, #14b8a6 42%, #0f766e 100%)",
            }}
            aria-hidden="true"
          >
            <span
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, transparent 48%, rgba(0,0,0,0.18) 100%)",
              }}
            />
            <span className="relative font-(family-name:--font-sora)">QS</span>
          </div>
          <div
            className={`min-w-0 overflow-hidden transition-all ${
              collapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
            }`}
          >
            <p className="font-(family-name:--font-sora) text-sm font-semibold tracking-tight">
              Quality Standards
            </p>
            <p className="text-sidebar-muted truncate text-xs">
              Engineering reference
            </p>
          </div>
          <button
            type="button"
            className="text-sidebar-muted hover:text-sidebar-foreground ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 lg:hidden"
            onClick={onCloseMobile}
            aria-label="Close navigation"
          >
            <NavIcon name="close" className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p
            className={`text-sidebar-muted mb-2 px-3 text-[11px] font-semibold tracking-[0.14em] uppercase ${
              collapsed ? "lg:px-0 lg:text-center" : ""
            }`}
          >
            {collapsed ? "QS" : "Standards"}
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              if (item.disabled) {
                return (
                  <li key={item.id}>
                    <span
                      className={`text-sidebar-muted/70 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
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
                        <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] tracking-wide uppercase">
                          Soon
                        </span>
                      </span>
                    </span>
                  </li>
                );
              }

              if (item.children?.length) {
                const parentActive = pathname.startsWith(item.href);
                const isOpen = openGroups[item.id] ?? parentActive;

                return (
                  <li key={item.id}>
                    <div className="space-y-1">
                      <div
                        className={`flex items-center gap-1 rounded-xl ${
                          parentActive ? "bg-sidebar-active/10" : ""
                        }`}
                      >
                        <Link
                          href={item.children[0].href}
                          onClick={onCloseMobile}
                          className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                            collapsed ? "lg:justify-center lg:px-2" : ""
                          } ${
                            parentActive
                              ? "text-sidebar-active font-semibold"
                              : "text-sidebar-foreground/85 hover:bg-white/10 hover:text-white"
                          }`}
                          title={collapsed ? item.label : undefined}
                        >
                          <NavIcon
                            name={item.icon}
                            className="h-5 w-5 shrink-0"
                          />
                          <span className={collapsed ? "lg:hidden" : ""}>
                            {item.label}
                          </span>
                        </Link>

                        <button
                          type="button"
                          className={`text-sidebar-muted hover:text-sidebar-foreground mr-1 inline-flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/10 ${
                            collapsed ? "lg:hidden" : ""
                          }`}
                          onClick={() => toggleGroup(item.id)}
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                        >
                          <NavIcon
                            name="chevronDown"
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <ul
                        className={`ml-4 space-y-1 border-l border-white/10 pl-2 ${
                          collapsed ? "lg:hidden" : ""
                        } ${isOpen ? "block" : "hidden"}`}
                      >
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <NavLink
                              item={child}
                              pathname={pathname}
                              searchParams={searchParams}
                              collapsed={collapsed}
                              onCloseMobile={onCloseMobile}
                              nested
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <NavLink
                    item={item}
                    pathname={pathname}
                    searchParams={searchParams}
                    collapsed={collapsed}
                    onCloseMobile={onCloseMobile}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className={`text-sidebar-muted border-t border-white/10 p-4 text-xs ${
            collapsed ? "lg:hidden" : ""
          }`}
        >
          <p>ISO · ASME · DIN reference hub</p>
          <p className="mt-1.5">
            by{" "}
            <span
              className="bg-clip-text font-semibold text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #2dd4bf 0%, #14b8a6 55%, #5eead4 100%)",
              }}
            >
              Urvish Rupareliya
            </span>
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
