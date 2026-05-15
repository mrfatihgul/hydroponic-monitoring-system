import { formatDateTime } from "../../utils/formatters.js";
import { SystemEventLog } from "./SystemEventLog.jsx";

function tipLabel(tip) {
  if (tip === "uyari") return "Warning";
  if (tip === "kritik") return "Critical";
  if (tip === "sistem") return "System";
  return "Info";
}

export function RecentSystemEventsCard({ events }) {
  const recent = events.slice(0, 3);

  return (
    <div className="rounded-lg border border-black/[0.06] bg-surface p-4 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.04)] dark:border-white/[0.08]">
      <ul className="divide-y divide-line">
        {recent.length === 0 ? (
          <li className="py-6 text-sm text-ink-muted">No entries.</li>
        ) : (
          recent.map((e) => (
            <li key={e.id} className="grid gap-1 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <p className="text-sm text-ink">{e.mesaj}</p>
              <div className="flex flex-wrap items-center gap-x-2 text-xs text-ink-muted">
                <span className="font-medium text-ink">{tipLabel(e.tip)}</span>
                <span className="font-mono tabular-nums">{formatDateTime(e.zaman)}</span>
              </div>
            </li>
          ))
        )}
      </ul>
      <details className="mt-3 border-t border-line pt-3">
        <summary className="cursor-pointer text-xs font-medium text-blue-700 hover:underline dark:text-blue-300">
          All entries
        </summary>
        <div className="mt-3">
          <SystemEventLog events={events} variant="embedded" />
        </div>
      </details>
    </div>
  );
}
