export function formatIdealRange(min, max, fractionDigits) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return "—";
  const opts = { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits };
  const a = Number(min).toLocaleString("tr-TR", opts);
  const b = Number(max).toLocaleString("tr-TR", opts);
  return `${a} – ${b}`;
}
