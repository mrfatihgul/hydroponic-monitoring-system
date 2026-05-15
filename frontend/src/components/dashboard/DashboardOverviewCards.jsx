import { formatDateTime } from "../../utils/formatters.js";
import { countCriticalMetrics, resolveSystemStatus } from "../../utils/systemStatus.js";
import { selectActiveBatch } from "../../utils/selectActiveBatch.js";
import { OVERVIEW_STATUS_ACCENT } from "../../constants/statusPresentation.js";

function OverviewCard({ label, children, accentClass = "border-l-slate-200 dark:border-l-slate-600" }) {
  return (
    <div
      className={[
        "rounded-lg border border-black/[0.06] bg-surface p-4 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.04)] dark:border-white/[0.08]",
        "border-l-2",
        accentClass,
      ].join(" ")}
    >
      <div className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">{label}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function DashboardOverviewCards({ latest, thresholds, batches, isStreaming }) {
  const active = selectActiveBatch(batches);
  const kritik = countCriticalMetrics(latest, thresholds);
  const status = resolveSystemStatus({ latest, isStreaming, thresholds });
  const accent = OVERVIEW_STATUS_ACCENT[status.code] ?? OVERVIEW_STATUS_ACCENT.baslatiliyor;

  const partiLine = active ? `${active.urunAdi} · ${active.bitkiSayisi}` : "—";
  const partiSub = active ? active.baslangicTarihi : null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <OverviewCard label="System status" accentClass={accent}>
        <div className="text-lg font-semibold tabular-nums text-ink">{status.label}</div>
        {status.detail ? <p className="mt-1 line-clamp-2 text-xs text-ink-muted">{status.detail}</p> : null}
      </OverviewCard>

      <OverviewCard label="Critical alerts">
        <div className="text-lg font-semibold tabular-nums text-ink">{latest ? String(kritik) : "—"}</div>
      </OverviewCard>

      <OverviewCard label="Active grow batch">
        <div className="text-lg font-semibold text-ink">{partiLine}</div>
        {partiSub ? <p className="mt-1 text-xs text-ink-muted tabular-nums">{partiSub}</p> : null}
      </OverviewCard>

      <OverviewCard label="Last update">
        <div className="flex items-start gap-2.5">
          <span
            className={
              isStreaming
                ? "mt-1.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-blue-600 animate-data-pulse"
                : "mt-1.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600"
            }
            aria-hidden="true"
          />
          <div className="min-w-0">
            <div className="text-lg font-semibold tabular-nums text-ink">{latest ? formatDateTime(latest.zaman) : "—"}</div>
            <p className="mt-1 text-xs text-ink-muted">{isStreaming ? "Live" : "Paused"}</p>
          </div>
        </div>
      </OverviewCard>
    </div>
  );
}
