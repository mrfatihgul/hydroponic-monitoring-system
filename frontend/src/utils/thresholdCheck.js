import { THRESHOLD_WARNING_MARGINS } from "../constants/thresholdMargins.js";

function statusForRange(value, min, max, margin) {
  if (value < min || value > max) {
    return "kritik";
  }
  if (value < min + margin || value > max - margin) {
    return "uyari";
  }
  return "normal";
}

function worst(a, b) {
  const order = { kritik: 3, uyari: 2, normal: 1 };
  return order[a] >= order[b] ? a : b;
}

export function evaluateReadingAgainstThresholds(reading, thresholds) {
  const byMetric = {
    ph: statusForRange(
      reading.ph,
      thresholds.phMin,
      thresholds.phMax,
      THRESHOLD_WARNING_MARGINS.ph,
    ),
    ec: statusForRange(
      reading.ec,
      thresholds.ecMin,
      thresholds.ecMax,
      THRESHOLD_WARNING_MARGINS.ec,
    ),
    sicaklik: statusForRange(
      reading.sicaklik,
      thresholds.sicaklikMin,
      thresholds.sicaklikMax,
      THRESHOLD_WARNING_MARGINS.sicaklik,
    ),
    nem: statusForRange(
      reading.nem,
      thresholds.nemMin,
      thresholds.nemMax,
      THRESHOLD_WARNING_MARGINS.nem,
    ),
    suSeviyesi: statusForRange(
      reading.suSeviyesi,
      thresholds.suSeviyesiMin,
      thresholds.suSeviyesiMax,
      THRESHOLD_WARNING_MARGINS.suSeviyesi,
    ),
  };

  const overall = Object.values(byMetric).reduce(worst, "normal");

  return { overall, byMetric };
}

export function readingHasAlert(reading, thresholds) {
  const { overall } = evaluateReadingAgainstThresholds(reading, thresholds);
  return overall !== "normal";
}
