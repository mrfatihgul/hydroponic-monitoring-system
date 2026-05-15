import { STORAGE_KEYS } from "../../constants/storageKeys.js";

function readJson(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or disabled */
  }
}

export function loadSensorHistory(fallback) {
  return readJson(STORAGE_KEYS.SENSOR_HISTORY, fallback);
}

export function saveSensorHistory(history) {
  writeJson(STORAGE_KEYS.SENSOR_HISTORY, history);
}

export function loadThresholds(fallback) {
  return readJson(STORAGE_KEYS.THRESHOLDS, fallback);
}

export function saveThresholds(thresholds) {
  writeJson(STORAGE_KEYS.THRESHOLDS, thresholds);
}

export function loadBatches() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.BATCHES);
    if (raw == null) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveBatches(batches) {
  writeJson(STORAGE_KEYS.BATCHES, batches);
}

export function loadTheme() {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem(STORAGE_KEYS.THEME) || "light";
}

export function saveTheme(theme) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEYS.THEME, theme);
}
