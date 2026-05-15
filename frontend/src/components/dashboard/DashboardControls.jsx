export function DashboardControls({ isStreaming, setIsStreaming, onAnomaly, onResetHistory }) {
  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-2xl border border-black/[0.06] bg-surface px-2 py-1.5 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.04)] dark:border-white/[0.08]"
      role="toolbar"
      aria-label="Data stream controls"
    >
      <button type="button" onClick={() => setIsStreaming((v) => !v)} className="btn-pill-toolbar">
        {isStreaming ? "Stop stream" : "Start stream"}
      </button>
      <span className="h-4 w-px shrink-0 bg-line" aria-hidden="true" />
      <button type="button" onClick={onAnomaly} className="btn-pill-toolbar">
        Anomaly
      </button>
      <span className="h-4 w-px shrink-0 bg-line" aria-hidden="true" />
      <button
        type="button"
        onClick={() => {
          if (window.confirm("Clear all sensor history?")) void onResetHistory();
        }}
        className="btn-pill-danger-toolbar"
      >
        Clear history
      </button>
    </div>
  );
}
