import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/batches", label: "Grow batches" },
  { to: "/thresholds", label: "Thresholds" },
  { to: "/analysis", label: "Analysis" },
  { to: "/about", label: "About" },
];

function linkClass({ isActive }) {
  return [
    "block rounded-full px-3 py-1.5 text-[12px] font-semibold leading-tight transition-all duration-200 ease-out",
    isActive
      ? "border border-line bg-surface text-ink shadow-sm"
      : "border border-transparent text-ink-muted hover:-translate-y-0.5 hover:border-line hover:bg-slate-50 hover:text-ink hover:shadow-sm dark:hover:bg-slate-800/50",
  ].join(" ");
}

export function Sidebar({ onNavigate }) {
  return (
    <aside className="flex h-full w-52 flex-col border-r border-line bg-surface shadow-sm">
      <div className="border-b border-line px-3 py-3">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">Control</div>
        <div className="mt-1 text-[13px] font-semibold leading-snug text-ink">Soilless grow</div>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={linkClass}
            onClick={() => onNavigate?.()}
            end={item.to === "/"}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-line p-2 text-[10px] leading-snug text-ink-muted">
        Demo telemetry; no hardware link.
      </div>
    </aside>
  );
}
