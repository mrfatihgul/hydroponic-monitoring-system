export function StatSummaryCard({ title, valueText, hint }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-4 shadow-sm">
      <div className="text-sm font-medium text-ink-muted">{title}</div>
      <div className="mt-2 text-xl font-semibold text-ink">{valueText}</div>
      {hint ? <p className="mt-2 text-xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}
