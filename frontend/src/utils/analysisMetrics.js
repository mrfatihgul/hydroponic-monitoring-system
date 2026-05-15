import { evaluateReadingAgainstThresholds } from "./thresholdCheck.js";
import { average } from "./formatters.js";
import { ANALYSIS_WINDOW } from "../constants/timing.js";

const WATER_ESTIMATE_BASE_L = 8.5;
const WATER_LEVEL_COEFF = 0.12;
const TEMP_DEV_COEFF = 0.25;
const TEMP_REFERENCE_C = 22;

export function computeAnalysisMetrics(history, thresholds) {
  if (!history.length) {
    return {
      ortalamalar: {
        ph: null,
        ec: null,
        sicaklik: null,
        nem: null,
        suSeviyesi: null,
      },
      son24Uyari: 0,
      kararlilikSkoru: null,
      tahminiGunlukSuL: null,
    };
  }

  const slice = history.slice(-ANALYSIS_WINDOW);
  let uyariSayisi = 0;
  for (const row of slice) {
    const { overall } = evaluateReadingAgainstThresholds(row, thresholds);
    if (overall !== "normal") uyariSayisi += 1;
  }

  let normalKayit = 0;
  for (const row of history) {
    const { overall } = evaluateReadingAgainstThresholds(row, thresholds);
    if (overall === "normal") normalKayit += 1;
  }

  const ortPh = average(history.map((h) => h.ph));
  const ortEc = average(history.map((h) => h.ec));
  const ortSic = average(history.map((h) => h.sicaklik));
  const ortNem = average(history.map((h) => h.nem));
  const ortSu = average(history.map((h) => h.suSeviyesi));

  const kararlilikSkoru = Math.max(
    0,
    Math.min(100, Math.round((normalKayit / history.length) * 100)),
  );

  const tahminiGunlukSuL = Math.max(
    0,
    Math.round(
      (WATER_ESTIMATE_BASE_L +
        (100 - (ortSu ?? 0)) * WATER_LEVEL_COEFF +
        Math.abs((ortSic ?? TEMP_REFERENCE_C) - TEMP_REFERENCE_C) * TEMP_DEV_COEFF) *
        10,
    ) / 10,
  );

  return {
    ortalamalar: {
      ph: ortPh,
      ec: ortEc,
      sicaklik: ortSic,
      nem: ortNem,
      suSeviyesi: ortSu,
    },
    son24Uyari: uyariSayisi,
    kararlilikSkoru,
    tahminiGunlukSuL,
  };
}
