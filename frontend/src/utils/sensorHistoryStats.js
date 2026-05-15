export function getSeriesStats(history, key) {
  if (!history.length) {
    return { min: null, max: null, last: null, prev: null };
  }
  const values = history.map((row) => row[key]).filter((v) => Number.isFinite(v));
  if (!values.length) {
    return { min: null, max: null, last: null, prev: null };
  }
  const last = history[history.length - 1][key];
  const prev = history.length > 1 ? history[history.length - 2][key] : null;
  return {
    min: Math.min(...values),
    max: Math.max(...values),
    last,
    prev,
  };
}

export function trendDirection(prev, last, epsilon) {
  if (!Number.isFinite(prev) || !Number.isFinite(last)) return "sabit";
  if (last - prev > epsilon) return "yukari";
  if (prev - last > epsilon) return "asagi";
  return "sabit";
}
