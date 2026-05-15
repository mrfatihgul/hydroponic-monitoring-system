import { THRESHOLD_METRIC_BINDINGS } from "../../constants/thresholdMetrics.js";

/**
 * @param {Array<{ metricName: string, minValue: number, maxValue: number }>} rows
 * @returns {Record<string, number>}
 */
export function thresholdRowsToFlat(rows) {
  const byMetric = Object.fromEntries(rows.map((r) => [r.metricName, r]));
  const flat = {};
  for (const b of THRESHOLD_METRIC_BINDINGS) {
    const row = byMetric[b.metricName];
    if (!row) continue;
    flat[b.minKey] = row.minValue;
    flat[b.maxKey] = row.maxValue;
  }
  return flat;
}

/**
 * @param {Array<{ id: number, metricName: string }>} rows
 * @returns {Record<string, number>}
 */
export function thresholdIdsByMetricName(rows) {
  return Object.fromEntries(rows.map((r) => [r.metricName, r.id]));
}

/**
 * @param {import("./types").SensorReadingDto} dto
 */
export function mapSensorReadingFromApi(dto) {
  return {
    id: String(dto.id),
    zaman: dto.timestamp,
    ph: dto.ph,
    ec: dto.ec,
    sicaklik: dto.temperature,
    nem: dto.humidity,
    suSeviyesi: dto.waterLevel,
  };
}

/**
 * @param {{ zaman: string, ph: number, ec: number, sicaklik: number, nem: number, suSeviyesi: number }} reading
 */
export function mapSensorReadingToApiPayload(reading) {
  return {
    timestamp: reading.zaman,
    ph: reading.ph,
    ec: reading.ec,
    temperature: reading.sicaklik,
    humidity: reading.nem,
    waterLevel: reading.suSeviyesi,
  };
}

/**
 * @param {import("./types").PlantBatchDto} dto
 */
export function mapPlantBatchFromApi(dto) {
  return {
    id: dto.id,
    urunAdi: dto.cropName,
    baslangicTarihi: dto.startDate,
    bitkiSayisi: dto.plantCount,
    notlar: dto.notes ?? "",
  };
}

/**
 * @param {{ urunAdi: string, baslangicTarihi: string, bitkiSayisi: number, notlar?: string }} ui
 */
export function mapPlantBatchToApiCreate(ui) {
  return {
    cropName: ui.urunAdi,
    startDate: ui.baslangicTarihi,
    plantCount: ui.bitkiSayisi,
    notes: ui.notlar ?? "",
  };
}

const SEVERITY_TO_TIP = {
  INFO: "bilgi",
  WARNING: "uyari",
  CRITICAL: "kritik",
  SYSTEM: "sistem",
};

const TIP_TO_SEVERITY = {
  bilgi: "INFO",
  uyari: "WARNING",
  kritik: "CRITICAL",
  sistem: "SYSTEM",
};

/**
 * @param {import("./types").SystemEventDto} dto
 */
export function mapSystemEventFromApi(dto) {
  const tip = SEVERITY_TO_TIP[dto.severity] ?? "bilgi";
  return {
    id: String(dto.id),
    zaman: dto.timestamp,
    tip,
    mesaj: dto.message,
  };
}

/**
 * @param {{ tip: string, mesaj: string }} partial
 * @returns {{ type: string, message: string, severity: string }}
 */
export function mapSystemEventToApiCreate(partial) {
  const tip = partial.tip ?? "bilgi";
  const severity = TIP_TO_SEVERITY[tip] ?? "INFO";
  const type = tip === "sistem" ? "SYSTEM" : tip === "bilgi" ? "OPERATOR" : "THRESHOLD";
  return {
    type,
    message: partial.mesaj ?? "",
    severity,
  };
}
