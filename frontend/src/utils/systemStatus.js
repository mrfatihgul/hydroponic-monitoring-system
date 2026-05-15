import { evaluateReadingAgainstThresholds } from "./thresholdCheck.js";

export function countCriticalMetrics(reading, thresholds) {
  if (!reading) return 0;
  const { byMetric } = evaluateReadingAgainstThresholds(reading, thresholds);
  return Object.values(byMetric).filter((s) => s === "kritik").length;
}

export function resolveSystemStatus({ latest, isStreaming, thresholds }) {
  if (!isStreaming) {
    return { code: "bekleme", label: "Idle", detail: "Data streaming is off." };
  }
  if (!latest) {
    return { code: "baslatiliyor", label: "Starting", detail: "Waiting for the first sample." };
  }
  const { overall } = evaluateReadingAgainstThresholds(latest, thresholds);
  if (overall === "kritik") {
    return { code: "kritik", label: "Critical", detail: "At least one parameter is outside critical limits." };
  }
  if (overall === "uyari") {
    return { code: "uyari", label: "Warning", detail: "Near a limit or elevated risk of a breach." };
  }
  return { code: "normal", label: "Running", detail: "All parameters are within the defined band." };
}
