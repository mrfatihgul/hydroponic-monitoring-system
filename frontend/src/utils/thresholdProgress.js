export function clamp01(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function markerPositionInBand(value, min, max) {
  if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max) || max === min) {
    return 0.5;
  }
  return clamp01((value - min) / (max - min));
}

export function bandFillRatio(value, min, max) {
  return markerPositionInBand(value, min, max);
}
