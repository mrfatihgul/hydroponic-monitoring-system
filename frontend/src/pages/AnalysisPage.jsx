import { useEffect, useState } from "react";
import { useAppState } from "../context/AppStateContext.jsx";
import { StatSummaryCard } from "../components/cards/StatSummaryCard.jsx";
import { computeAnalysisMetrics } from "../utils/analysisMetrics.js";
import { buildSensorHistoryCsv, downloadTextFile } from "../utils/csvExport.js";
import { roundOptional } from "../utils/formatters.js";
import { ANALYSIS_WINDOW } from "../constants/timing.js";
import { analyticsApi } from "../services/api/analyticsApi.js";
import { getApiErrorMessage } from "../services/api/apiErrors.js";

function formatAvg(value, digits) {
  if (value == null) return "No data";
  const r = roundOptional(value, digits);
  return r == null ? "No data" : String(r);
}

function mapSummaryToMetrics(summary) {
  return {
    ortalamalar: {
      ph: summary.averagePh,
      ec: summary.averageEc,
      sicaklik: summary.averageTemperature,
      nem: summary.averageHumidity,
      suSeviyesi: summary.averageWaterLevel,
    },
    son24Uyari: summary.criticalAlertCount ?? 0,
    kararlilikSkoru: summary.stabilityScore,
    tahminiGunlukSuL: summary.estimatedDailyWaterUsage,
  };
}

export function AnalysisPage() {
  const { history, thresholds, dataMode } = useAppState();
  const [apiSummary, setApiSummary] = useState(null);
  const [apiSummaryError, setApiSummaryError] = useState("");

  useEffect(() => {
    if (dataMode !== "api") {
      setApiSummary(null);
      setApiSummaryError("");
      return undefined;
    }
    let cancelled = false;
    (async () => {
      try {
        const s = await analyticsApi.summary();
        if (!cancelled) {
          setApiSummary(s);
          setApiSummaryError("");
        }
      } catch (err) {
        if (!cancelled) {
          setApiSummary(null);
          setApiSummaryError(getApiErrorMessage(err));
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dataMode]);

  const metrics =
    dataMode === "api" && apiSummary ? mapSummaryToMetrics(apiSummary) : computeAnalysisMetrics(history, thresholds);

  function exportCsv() {
    if (!history.length) return;
    const csv = buildSensorHistoryCsv(history);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    downloadTextFile(`sensor-history-${stamp}.csv`, csv);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-ink">Analysis</h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">
          {dataMode === "api"
            ? "Summaries are computed on the server from stored readings and the threshold table. Stability score reflects how many readings stayed in-band."
            : "Summaries are computed from the current sensor history. Stability score reflects how many readings stayed in-band. The water-use estimate is a simulation-only indicator."}
        </p>
        {apiSummaryError ? <p className="mt-2 text-sm text-rose-700 dark:text-rose-300">{apiSummaryError}</p> : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatSummaryCard title="Average pH" valueText={formatAvg(metrics.ortalamalar.ph, 2)} />
        <StatSummaryCard title="Average EC (mS/cm)" valueText={formatAvg(metrics.ortalamalar.ec, 2)} />
        <StatSummaryCard title="Average temperature (°C)" valueText={formatAvg(metrics.ortalamalar.sicaklik, 1)} />
        <StatSummaryCard title="Average humidity (%)" valueText={formatAvg(metrics.ortalamalar.nem, 1)} />
        <StatSummaryCard title="Average water level (%)" valueText={formatAvg(metrics.ortalamalar.suSeviyesi, 1)} />
        <StatSummaryCard
          title={`Critical samples (last ${ANALYSIS_WINDOW} readings)`}
          valueText={String(metrics.son24Uyari)}
          hint="Readings classified as critical (strictly outside limits), matching the API criticalAlertCount field."
        />
        <StatSummaryCard
          title="Stability score"
          valueText={metrics.kararlilikSkoru == null ? "No data" : `${metrics.kararlilikSkoru} / 100`}
          hint="0–100; based on the share of readings that stayed in-band."
        />
        <StatSummaryCard
          title="Estimated daily water use"
          valueText={
            metrics.tahminiGunlukSuL == null
              ? "No data"
              : `${metrics.tahminiGunlukSuL} L / day${dataMode === "api" ? "" : " (simulation)"}`
          }
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={exportCsv}
          disabled={!history.length}
          className="btn-pill-primary disabled:cursor-not-allowed"
        >
          Export sensor history as CSV
        </button>
        {!history.length ? (
          <span className="self-center text-sm text-ink-muted">Nothing to export.</span>
        ) : null}
      </div>
    </div>
  );
}
