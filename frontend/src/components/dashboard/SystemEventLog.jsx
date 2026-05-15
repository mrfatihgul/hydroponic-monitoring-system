import { useMemo, useState } from "react";
import { SYSTEM_LOG_FILTERS } from "../../constants/systemLog.js";
import { EVENT_LOG_MAX_HEIGHT_CLASS } from "../../constants/dashboardUi.js";
import { formatDateTime } from "../../utils/formatters.js";

const tipTone = {
  bilgi: "text-ink",
  uyari: "text-amber-800 dark:text-amber-200",
  kritik: "text-rose-800 dark:text-rose-200",
  sistem: "text-ink-muted",
};

function tipLabel(tip) {
  if (tip === "uyari") return "Warning";
  if (tip === "kritik") return "Critical";
  if (tip === "sistem") return "System";
  return "Info";
}

export function SystemEventLog({ events, variant = "default" }) {
  const [filter, setFilter] = useState("tumu");
  const embedded = variant === "embedded";

  const rows = useMemo(() => {
    if (filter === "tumu") return events;
    return events.filter((e) => e.tip === filter);
  }, [events, filter]);

  const shell = embedded
    ? "rounded-md border border-black/[0.06] bg-surface dark:border-white/[0.08]"
    : "rounded-lg border border-black/[0.06] bg-surface shadow-[0_1px_2px_0_rgb(0_0_0_/_0.04)] dark:border-white/[0.08]";

  return (
    <div className={shell}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2">
        <div className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">
          {embedded ? "Log" : "Event log"}
        </div>
        <label className="flex items-center gap-2 text-xs text-ink-muted">
          <select
            className="rounded-md border border-line bg-slate-50 px-2 py-1 text-xs text-ink dark:bg-slate-900"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {SYSTEM_LOG_FILTERS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={`${EVENT_LOG_MAX_HEIGHT_CLASS} overflow-y-auto px-3 py-2`}>
        {!rows.length ? (
          <div className="px-2 py-6 text-sm text-ink-muted">No entries.</div>
        ) : (
          <ul className="divide-y divide-line">
            {rows.map((e) => (
              <li
                key={e.id}
                className="grid gap-2 py-3 text-sm sm:grid-cols-[minmax(0,140px)_minmax(0,88px)_1fr] sm:items-start"
              >
                <div className="font-mono text-xs text-ink-muted">{formatDateTime(e.zaman)}</div>
                <div className={`text-xs font-semibold ${tipTone[e.tip] ?? tipTone.bilgi}`}>{tipLabel(e.tip)}</div>
                <div className="text-ink">{e.mesaj}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
