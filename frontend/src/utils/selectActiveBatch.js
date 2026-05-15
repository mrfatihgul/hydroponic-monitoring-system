function parseDate(value) {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T12:00:00`)
    : new Date(value);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}

export function selectActiveBatch(batches) {
  if (!Array.isArray(batches) || !batches.length) return null;
  const sorted = [...batches].sort((a, b) => parseDate(b.baslangicTarihi) - parseDate(a.baslangicTarihi));
  return sorted[0];
}
