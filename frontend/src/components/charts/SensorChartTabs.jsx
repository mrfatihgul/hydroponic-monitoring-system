import { useState } from "react";
import { SensorLineChart } from "./SensorLineChart.jsx";
import { SensorChartPanel } from "./SensorChartPanel.jsx";
import { getSeriesStats } from "../../utils/sensorHistoryStats.js";
import { CHART_LINE_STROKE } from "../../constants/chartTokens.js";
import { MAIN_CHART_HEIGHT_PX } from "../../constants/dashboardUi.js";

const TABS = [
  { id: "ph", label: "pH", dataKey: "ph", name: "pH", unit: "", fractionDigits: 2 },
  { id: "ec", label: "EC", dataKey: "ec", name: "EC", unit: "mS/cm", fractionDigits: 2 },
  { id: "sicaklik", label: "Temperature", dataKey: "sicaklik", name: "Temperature", unit: "°C", fractionDigits: 1 },
  { id: "nem", label: "Humidity", dataKey: "nem", name: "Humidity", unit: "%", fractionDigits: 1 },
  { id: "suSeviyesi", label: "Water level", dataKey: "suSeviyesi", name: "Water level", unit: "%", fractionDigits: 1 },
];

export function SensorChartTabs({ chartData, history }) {
  const [activeId, setActiveId] = useState("ph");
  const tab = TABS.find((t) => t.id === activeId) ?? TABS[0];
  const stats = getSeriesStats(history, tab.dataKey);

  return (
    <div className="rounded-lg border border-black/[0.06] bg-surface shadow-[0_1px_2px_0_rgb(0_0_0_/_0.04)] dark:border-white/[0.08]">
      <div
        className="flex flex-wrap gap-2 border-b border-black/[0.06] px-3 py-3 dark:border-white/[0.08]"
        role="tablist"
        aria-label="Sensor charts"
      >
        {TABS.map((t) => {
          const selected = t.id === activeId;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(t.id)}
              className={selected ? "btn-pill-tab-active" : "btn-pill-tab-idle"}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div className="p-4" role="tabpanel">
        <SensorChartPanel
          title=""
          showTitle={false}
          flush
          unit={tab.unit}
          stats={{ ...stats, digits: tab.fractionDigits === 1 ? 1 : 2 }}
        >
          <SensorLineChart
            data={chartData}
            dataKey={tab.dataKey}
            name={tab.name}
            stroke={CHART_LINE_STROKE}
            heightPx={MAIN_CHART_HEIGHT_PX}
            unit={tab.unit}
            fractionDigits={tab.fractionDigits}
          />
        </SensorChartPanel>
      </div>
    </div>
  );
}
