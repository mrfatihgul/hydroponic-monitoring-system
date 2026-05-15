import { useEffect, useMemo, useState } from "react";

const fields = [
  { keyMin: "phMin", keyMax: "phMax", label: "pH", step: "0.1" },
  { keyMin: "ecMin", keyMax: "ecMax", label: "EC (mS/cm)", step: "0.1" },
  { keyMin: "sicaklikMin", keyMax: "sicaklikMax", label: "Temperature (°C)", step: "0.1" },
  { keyMin: "nemMin", keyMax: "nemMax", label: "Humidity (%)", step: "0.1" },
  { keyMin: "suSeviyesiMin", keyMax: "suSeviyesiMax", label: "Water level (%)", step: "0.1" },
];

function toDraft(thresholds) {
  const draft = {};
  for (const f of fields) {
    draft[f.keyMin] = String(thresholds[f.keyMin]);
    draft[f.keyMax] = String(thresholds[f.keyMax]);
  }
  return draft;
}

export function ThresholdForm({ thresholds, onCommit, onReset }) {
  const [draft, setDraft] = useState(() => toDraft(thresholds));
  const [error, setError] = useState("");

  const fingerprint = useMemo(() => JSON.stringify(thresholds), [thresholds]);

  useEffect(() => {
    setDraft(toDraft(thresholds));
    setError("");
  }, [fingerprint, thresholds]);

  function handleChange(key, value) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function validateDraft(current) {
    for (const f of fields) {
      const min = Number(current[f.keyMin]);
      const max = Number(current[f.keyMax]);
      if (!Number.isFinite(min) || !Number.isFinite(max)) {
        return `Enter valid numbers for ${f.label}.`;
      }
      if (min >= max) {
        return `For ${f.label}, minimum must be less than maximum.`;
      }
    }
    return "";
  }

  function commitIfValid(nextDraft) {
    const msg = validateDraft(nextDraft);
    setError(msg);
    if (msg) return;
    const payload = {};
    for (const f of fields) {
      payload[f.keyMin] = Number(nextDraft[f.keyMin]);
      payload[f.keyMax] = Number(nextDraft[f.keyMax]);
    }
    onCommit(payload);
  }

  function handleBlur() {
    commitIfValid(draft);
  }

  return (
    <div className="space-y-4 rounded-lg border border-line bg-surface p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold text-ink">Threshold values</div>
        <button
          type="button"
          onClick={() => {
            setError("");
            void onReset();
          }}
          className="btn-pill-secondary"
        >
          Reset to defaults
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase text-ink-muted">
            <tr>
              <th className="py-2 pr-4 font-medium">Parameter</th>
              <th className="py-2 pr-4 font-medium">Minimum</th>
              <th className="py-2 pr-4 font-medium">Maximum</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f) => (
              <tr key={f.label} className="border-t border-line">
                <td className="py-2 pr-4 text-ink">{f.label}</td>
                <td className="py-2 pr-4">
                  <input
                    type="number"
                    step={f.step}
                    value={draft[f.keyMin]}
                    onChange={(e) => handleChange(f.keyMin, e.target.value)}
                    onBlur={handleBlur}
                    className="w-28 rounded-md border border-line bg-surface-muted px-2 py-1 text-sm text-ink outline-none ring-accent focus:ring-2"
                  />
                </td>
                <td className="py-2 pr-4">
                  <input
                    type="number"
                    step={f.step}
                    value={draft[f.keyMax]}
                    onChange={(e) => handleChange(f.keyMax, e.target.value)}
                    onBlur={handleBlur}
                    className="w-28 rounded-md border border-line bg-surface-muted px-2 py-1 text-sm text-ink outline-none ring-accent focus:ring-2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error ? <p className="text-sm text-rose-700 dark:text-rose-300">{error}</p> : null}
      <p className="text-xs text-ink-muted">Valid values are saved automatically when you leave a field.</p>
    </div>
  );
}
