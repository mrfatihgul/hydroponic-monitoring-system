import { useAppState } from "../context/AppStateContext.jsx";

export function AboutPage() {
  const { dataMode } = useAppState();
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h2 className="text-lg font-semibold text-ink">About this project</h2>
      <div className="space-y-4 text-sm leading-relaxed text-ink">
        <p>
          This project is a small-scale soilless (hydroponic) monitoring dashboard. Use the{" "}
          <strong>Data source</strong> control in the header to switch between <strong>Demo</strong> (simulated data
          in the browser) and <strong>API</strong> (Spring Boot backend).
        </p>
        <p>
          {dataMode === "api"
            ? "You are in API mode: batches, thresholds, sensor history, and events are managed on the server (H2 in development)."
            : "You are in Demo mode: sensor samples are generated locally; batches, thresholds, and history stay in the browser."}
        </p>
        <p>
          Set the API base URL with the <code className="rounded bg-surface-muted px-1 py-0.5 text-xs">VITE_API_BASE_URL</code>{" "}
          environment variable (default:{" "}
          <code className="rounded bg-surface-muted px-1 py-0.5 text-xs">http://localhost:8080/api</code>).
        </p>
        <p>Monitored parameters are pH, EC, temperature, humidity, and water level.</p>
      </div>
    </div>
  );
}
