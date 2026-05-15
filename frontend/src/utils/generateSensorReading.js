import {
  SENSOR_BASELINE,
  SENSOR_DRIFT,
  SENSOR_HARD_LIMITS,
} from "../constants/sensorSimulation.js";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function jitter(range) {
  return (Math.random() * 2 - 1) * range;
}

function nextField(previous, key) {
  const base = previous ?? SENSOR_BASELINE[key];
  const delta = SENSOR_DRIFT[key];
  const limits = SENSOR_HARD_LIMITS[key];
  return clamp(base + jitter(delta), limits.min, limits.max);
}

export function generateSensorReading(previous, options = {}) {
  const prev = previous ?? null;
  const reading = {
    ph: nextField(prev?.ph, "ph"),
    ec: nextField(prev?.ec, "ec"),
    sicaklik: nextField(prev?.sicaklik, "sicaklik"),
    nem: nextField(prev?.nem, "nem"),
    suSeviyesi: nextField(prev?.suSeviyesi, "suSeviyesi"),
  };

  if (options.forceAnomaly) {
    const pick = Math.floor(Math.random() * 5);
    const keys = ["ph", "ec", "sicaklik", "nem", "suSeviyesi"];
    const target = keys[pick];
    const limits = SENSOR_HARD_LIMITS[target];
    reading[target] =
      Math.random() < 0.5 ? limits.min - Math.random() * 0.5 : limits.max + Math.random() * 0.5;
    reading[target] = clamp(reading[target], limits.min - 2, limits.max + 2);
  }

  return reading;
}
