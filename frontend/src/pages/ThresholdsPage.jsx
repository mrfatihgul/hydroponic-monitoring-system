import { useAppState } from "../context/AppStateContext.jsx";
import { ThresholdForm } from "../components/forms/ThresholdForm.jsx";

export function ThresholdsPage() {
  const { thresholds, setThresholds, resetThresholds, dataMode } = useAppState();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-ink">Threshold settings</h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">
          Alerts and critical states are derived from the minimum and maximum values defined here.
          {dataMode === "api" ? " Changes are saved to the server." : " Changes are stored in your browser."}
        </p>
      </div>
      <ThresholdForm thresholds={thresholds} onCommit={setThresholds} onReset={resetThresholds} />
    </div>
  );
}
