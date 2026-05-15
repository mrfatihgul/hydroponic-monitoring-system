import { DEFAULT_THRESHOLDS } from "../constants/defaultThresholds.js";

export const DEFAULT_BATCH = {
  id: "sample-lettuce-1",
  urunAdi: "Lettuce",
  baslangicTarihi: "2026-05-01",
  bitkiSayisi: 30,
  notlar: "NFT channel trial crop",
};

export function createInitialBatches() {
  return [DEFAULT_BATCH];
}

export function createInitialThresholds() {
  return { ...DEFAULT_THRESHOLDS };
}
