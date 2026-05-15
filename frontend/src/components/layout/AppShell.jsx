import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar.jsx";
import { ThemeToggle } from "./ThemeToggle.jsx";
import { DataSourceToolbar } from "./DataSourceToolbar.jsx";
import { useAppState } from "../../context/AppStateContext.jsx";

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dataMode } = useAppState();
  const subtitle =
    dataMode === "api"
      ? "Hydroponic monitoring via Spring Boot API"
      : "Hydroponic monitoring and thresholds (local demo)";

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <div
        className={[
          "fixed inset-0 z-40 bg-ink/40 lg:hidden",
          mobileOpen ? "block" : "hidden",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <div
        className={[
          "fixed inset-y-0 left-0 z-50 w-52 transform bg-surface transition-transform lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <Sidebar onNavigate={() => setMobileOpen(false)} />
      </div>
      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <header className="flex items-center justify-between gap-3 border-b border-line bg-surface px-3 py-2 lg:px-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn-pill-header lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="app-sidebar"
            >
              Menu
            </button>
            <div>
              <h1 className="text-[13px] font-semibold leading-snug text-ink lg:text-[14px]">
                Soilless Farming Control Panel
              </h1>
              <p className="hidden text-[11px] text-ink-muted sm:block">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DataSourceToolbar />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 px-4 py-6 lg:px-6">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
