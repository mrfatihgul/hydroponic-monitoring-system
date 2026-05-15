import { STATUS_LABEL } from "../../constants/statusLabels.js";
import { SENSOR_STATUS_BADGE } from "../../constants/statusPresentation.js";
import { FriendlyTrend } from "../dashboard/FriendlyTrend.jsx";

export function SimpleSensorCard({
  title,
  valueText,
  unit,
  statusKey,
  idealRangeText,
  prevValue,
  lastValue,
  trendEpsilon,
}) {
  const badge = SENSOR_STATUS_BADGE[statusKey] ?? SENSOR_STATUS_BADGE.normal;
  const label = STATUS_LABEL[statusKey] ?? STATUS_LABEL.normal;

  return (
    <div className="rounded-lg border border-black/[0.06] bg-surface p-4 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.04)] dark:border-white/[0.08]">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-ink">{title}</h3>
        <span className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${badge}`}>{label}</span>
      </div>
      <div className="mt-3 flex flex-wrap items-baseline gap-1.5">
        <span className="text-3xl font-semibold tabular-nums tracking-tight text-ink">{valueText}</span>
        {unit ? <span className="text-sm text-ink-muted">{unit}</span> : null}
      </div>
      <p className="mt-2 text-xs text-ink-muted">
        Ideal: <span className="font-medium text-ink">{idealRangeText}</span>
      </p>
      <div className="mt-1.5">
        <FriendlyTrend prev={prevValue} last={lastValue} epsilon={trendEpsilon} />
      </div>
    </div>
  );
}
