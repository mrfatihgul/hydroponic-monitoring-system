function StatPill({ label, value, unit, digits = 2 }) {
  const text =
    value == null || !Number.isFinite(value)
      ? "—"
      : digits === 1
        ? value.toFixed(1)
        : value.toFixed(2);
  return (
    <div className="rounded-md border border-black/[0.06] bg-slate-50/80 px-2 py-1 dark:border-white/[0.08] dark:bg-slate-900/40">
      <div className="text-[10px] font-medium uppercase tracking-wide text-ink-muted">{label}</div>
      <div className="font-mono text-xs font-semibold tabular-nums text-ink">
        {text}
        {unit ? <span className="text-[10px] font-normal text-ink-muted"> {unit}</span> : null}
      </div>
    </div>
  );
}

export function SensorChartPanel({ title, unit, stats, children, showTitle = true, flush = false }) {
  const digits = stats.digits ?? 2;
  const shell = flush
    ? "bg-transparent p-0 shadow-none border-0"
    : "rounded-lg border border-black/[0.06] bg-surface p-4 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.04)] dark:border-white/[0.08]";
  return (
    <div className={shell}>
      <div className={`flex flex-wrap items-start gap-3 ${showTitle && title ? "justify-between" : "justify-end"}`}>
        {showTitle && title ? (
          <div className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">{title}</div>
        ) : null}
        <div className="grid grid-cols-3 gap-2">
          <StatPill label="Last" value={stats.last} unit={unit} digits={digits} />
          <StatPill label="Min" value={stats.min} unit={unit} digits={digits} />
          <StatPill label="Max" value={stats.max} unit={unit} digits={digits} />
        </div>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
