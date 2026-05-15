import { NFT_CHANNEL_COUNT } from "../constants/dashboardUi.js";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function flowLabel(suSeviyesi, index) {
  if (suSeviyesi < 28) return index % 2 === 0 ? "Low" : "Off";
  if (suSeviyesi < 45) return "Low";
  return "Flowing";
}

export function buildNftChannelSnapshot(latest, thresholds) {
  if (!latest || !thresholds) {
    return Array.from({ length: NFT_CHANNEL_COUNT }, (_, i) => ({
      id: `K-${i + 1}`,
      aktif: false,
      ph: null,
      ec: null,
      akis: "—",
    }));
  }

  return Array.from({ length: NFT_CHANNEL_COUNT }, (_, i) => {
    const offsetPh = (i - 2.5) * 0.04;
    const offsetEc = ((i % 3) - 1) * 0.05;
    const ph = clamp(latest.ph + offsetPh, 0, 14);
    const ec = clamp(latest.ec + offsetEc, 0, 5);
    const aktif = !(i === NFT_CHANNEL_COUNT - 1 && latest.suSeviyesi < 32);
    const akis = aktif ? flowLabel(latest.suSeviyesi, i) : "Off";
    return {
      id: `K-${i + 1}`,
      aktif,
      ph,
      ec,
      akis,
    };
  });
}
