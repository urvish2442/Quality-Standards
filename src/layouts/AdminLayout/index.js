"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Sidebar from "@/layouts/AdminLayout/components/Sidebar";
import Navbar from "@/layouts/AdminLayout/components/Navbar";

const AdminLayoutShell = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    closeMobile();
  }, [pathname, searchParams, closeMobile]);

  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMobile();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, closeMobile]);

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={closeMobile}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Navbar
          collapsed={collapsed}
          onToggleSidebar={() => setCollapsed((value) => !value)}
          onOpenMobile={() => setMobileOpen(true)}
        />
        <main className="flex-1 px-4 py-3 sm:px-6 sm:py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

const AdminLayout = ({ children }) => {
  return (
    <Suspense fallback={null}>
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </Suspense>
  );
};

export default AdminLayout;
