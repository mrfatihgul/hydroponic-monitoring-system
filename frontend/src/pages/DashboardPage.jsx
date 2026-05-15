import { useMemo } from "react";
import { useAppState } from "../context/AppStateContext.jsx";
import { useSensorSimulation } from "../hooks/useSensorSimulation.js";
import { SimpleSensorCard } from "../components/cards/SimpleSensorCard.jsx";
import { AlertsPanel } from "../components/alerts/AlertsPanel.jsx";
import { DashboardOverviewCards } from "../components/dashboard/DashboardOverviewCards.jsx";
import { DashboardControls } from "../components/dashboard/DashboardControls.jsx";
import { SectionTitle } from "../components/dashboard/SectionTitle.jsx";
import { RecentSystemEventsCard } from "../components/dashboard/RecentSystemEventsCard.jsx";
import { NftChannelStatus } from "../components/dashboard/NftChannelStatus.jsx";
import { SensorChartTabs } from "../components/charts/SensorChartTabs.jsx";
import { evaluateReadingAgainstThresholds } from "../utils/thresholdCheck.js";
import { formatTimeShort } from "../utils/formatters.js";
import { getSeriesStats } from "../utils/sensorHistoryStats.js";
import { TREND_EPSILON, CRITICAL_MONITOR_MAX_CLASS } from "../constants/dashboardUi.js";
import { formatIdealRange } from "../utils/formatIdealRange.js";

function chartRows(history) {
  return history.map((row) => ({
    ...row,
    zamanEtiketi: formatTimeShort(row.zaman),
  }));
}

export function DashboardPage() {
  const { thresholds, batches, systemEvents } = useAppState();
  const { history, isStreaming, setIsStreaming, triggerAnomaly, resetHistory } = useSensorSimulation();

  const latest = history.length ? history[history.length - 1] : null;
  const chartData = useMemo(() => chartRows(history), [history]);

  const evaluation = latest
    ? evaluateReadingAgainstThresholds(latest, thresholds)
    : null;

  const metricDefs = [
    {
      title: "pH",
      key: "ph",
      unit: "",
      min: thresholds.phMin,
      max: thresholds.phMax,
      valueText: latest ? Number(latest.ph).toFixed(2) : "—",
      fractionDigits: 2,
    },
    {
      title: "EC",
      key: "ec",
      unit: "mS/cm",
      min: thresholds.ecMin,
      max: thresholds.ecMax,
      valueText: latest ? Number(latest.ec).toFixed(2) : "—",
      fractionDigits: 2,
    },
    {
      title: "Temperature",
      key: "sicaklik",
      unit: "°C",
      min: thresholds.sicaklikMin,
      max: thresholds.sicaklikMax,
      valueText: latest ? Number(latest.sicaklik).toFixed(1) : "—",
      fractionDigits: 1,
    },
    {
      title: "Humidity",
      key: "nem",
      unit: "%",
      min: thresholds.nemMin,
      max: thresholds.nemMax,
      valueText: latest ? Number(latest.nem).toFixed(1) : "—",
      fractionDigits: 1,
    },
    {
      title: "Water level",
      key: "suSeviyesi",
      unit: "%",
      min: thresholds.suSeviyesiMin,
      max: thresholds.suSeviyesiMax,
      valueText: latest ? Number(latest.suSeviyesi).toFixed(1) : "—",
      fractionDigits: 1,
    },
  ];

  return (
    <div className="space-y-7 pb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold text-ink">Dashboard</h1>
        <DashboardControls
          isStreaming={isStreaming}
          setIsStreaming={setIsStreaming}
          onAnomaly={triggerAnomaly}
          onResetHistory={resetHistory}
        />
      </div>

      <section className="space-y-3" aria-labelledby="dash-summary">
        <SectionTitle id="dash-summary">System overview</SectionTitle>
        <DashboardOverviewCards
          latest={latest}
          thresholds={thresholds}
          batches={batches}
          isStreaming={isStreaming}
        />
      </section>

      <section className="space-y-3" aria-labelledby="dash-critical">
        <div className={`w-full space-y-3 ${CRITICAL_MONITOR_MAX_CLASS}`}>
          <SectionTitle id="dash-critical">Critical monitoring</SectionTitle>
          <AlertsPanel reading={latest} thresholds={thresholds} dense />
        </div>
      </section>

      <section className="space-y-3" aria-labelledby="dash-sensors">
        <SectionTitle id="dash-sensors">Sensor readings</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {metricDefs.map((m) => {
            const stats = getSeriesStats(history, m.key);
            const statusKey = evaluation?.byMetric[m.key] ?? "normal";
            const ideal = formatIdealRange(m.min, m.max, m.fractionDigits);
            return (
              <SimpleSensorCard
                key={m.key}
                title={m.title}
                valueText={m.valueText}
                unit={m.unit}
                statusKey={statusKey}
                idealRangeText={ideal}
                prevValue={stats.prev}
                lastValue={stats.last}
                trendEpsilon={TREND_EPSILON[m.key]}
              />
            );
          })}
        </div>
      </section>

      <section className="space-y-3" aria-labelledby="dash-analysis">
        <SectionTitle id="dash-analysis">Analysis</SectionTitle>
        <SensorChartTabs chartData={chartData} history={history} />
      </section>

      <section className="space-y-3" aria-labelledby="dash-log">
        <SectionTitle id="dash-log">Event log</SectionTitle>
        <div className="grid gap-3 lg:grid-cols-2">
          <RecentSystemEventsCard events={systemEvents} />
          <NftChannelStatus latest={latest} thresholds={thresholds} />
        </div>
      </section>
    </div>
  );
}
