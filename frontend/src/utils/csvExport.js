function escapeCsvCell(value) {
  const s = String(value ?? "");
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function buildSensorHistoryCsv(rows) {
  const header = ["id", "zaman", "ph", "ec", "sicaklik", "nem", "suSeviyesi"];
  const lines = [header.join(",")];
  for (const row of rows) {
    lines.push(
      [
        escapeCsvCell(row.id),
        escapeCsvCell(row.zaman),
        escapeCsvCell(row.ph),
        escapeCsvCell(row.ec),
        escapeCsvCell(row.sicaklik),
        escapeCsvCell(row.nem),
        escapeCsvCell(row.suSeviyesi),
      ].join(","),
    );
  }
  return `\uFEFF${lines.join("\r\n")}`;
}

export function downloadTextFile(filename, content, mimeType = "text/csv;charset=utf-8") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
