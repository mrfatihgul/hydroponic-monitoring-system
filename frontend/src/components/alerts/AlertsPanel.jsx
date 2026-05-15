import { evaluateReadingAgainstThresholds } from "../../utils/thresholdCheck.js";
import { STATUS_LABEL } from "../../constants/statusLabels.js";

function metricLabel(key) {
  switch (key) {
    case "ph":
      return "pH";
    case "ec":
      return "EC";
    case "sicaklik":
      return "Temperature";
    case "nem":
      return "Humidity";
    case "suSeviyesi":
      return "Water level";
    default:
      return key;
  }
}

export function AlertsPanel({ reading, thresholds, dense = false }) {
  const box = dense
    ? "rounded-md border border-black/[0.06] bg-surface p-3 dark:border-white/[0.08]"
    : "rounded-lg border border-black/[0.06] bg-surface p-4 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.04)] dark:border-white/[0.08]";
  const titleCls = "text-xs font-semibold text-ink";
  const bodyCls = dense ? "text-xs" : "text-sm";

  if (!reading) {
    return (
      <div className={`${box} text-sm text-ink-muted`}>
        Waiting for a sample.
      </div>
    );
  }

  const evaluation = evaluateReadingAgainstThresholds(reading, thresholds);
  const issues = Object.entries(evaluation.byMetric).filter(([, s]) => s !== "normal");

  if (!issues.length) {
    return (
      <div className={box}>
        <div className={titleCls}>Thresholds</div>
        <p className="mt-2 text-sm text-ink-muted">All parameters are within range.</p>
      </div>
    );
  }

  return (
    <div
      className={
        dense
          ? "rounded-md border border-amber-600/15 bg-amber-50/50 p-3 dark:bg-amber-950/20"
          : "rounded-lg border border-amber-600/20 bg-amber-50/60 p-4 dark:border-amber-900/30 dark:bg-amber-950/25"
      }
    >
      <div className={titleCls}>Threshold alert</div>
      <ul className={`mt-2 space-y-2 ${bodyCls} text-ink`}>
        {issues.map(([key, status]) => (
          <li key={key} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-amber-900/10 pb-2 last:border-0 last:pb-0 dark:border-amber-100/10">
            <span className="font-medium">{metricLabel(key)}</span>
            <span className="text-ink-muted">
              <span className="text-ink">{STATUS_LABEL[status]}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
