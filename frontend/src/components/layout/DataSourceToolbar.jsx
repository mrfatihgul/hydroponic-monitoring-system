import { useDataMode } from "../../context/DataModeContext.jsx";

export function DataSourceToolbar() {
  const { dataMode, setDataMode, apiError, clearApiError } = useDataMode();
  const isApi = dataMode === "api";

  return (
    <div className="flex flex-col items-end gap-2">
      {apiError ? (
        <div className="max-w-xs rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-900 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-100">
          <div className="flex items-start justify-between gap-2">
            <span>{apiError}</span>
            <button type="button" className="shrink-0 underline" onClick={clearApiError}>
              Dismiss
            </button>
          </div>
        </div>
      ) : null}
      <div className="flex flex-wrap items-center justify-end gap-2">
        <span className="text-[11px] text-ink-muted">Data source</span>
        <div className="inline-flex rounded-full border border-line bg-surface-muted/50 p-0.5 dark:bg-slate-800/60">
          <button
            type="button"
            onClick={() => void setDataMode("demo")}
            className={[
              "rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-200",
              !isApi ? "bg-surface text-ink shadow-sm" : "text-ink-muted hover:text-ink",
            ].join(" ")}
          >
            Demo
          </button>
          <button
            type="button"
            onClick={() => void setDataMode("api")}
            className={[
              "rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-200",
              isApi ? "bg-surface text-ink shadow-sm" : "text-ink-muted hover:text-ink",
            ].join(" ")}
          >
            API
          </button>
        </div>
      </div>
    </div>
  );
}
