import { useState } from "react";

const emptyForm = {
  urunAdi: "",
  baslangicTarihi: "",
  bitkiSayisi: "",
  notlar: "",
};

export function BatchForm({ onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const urunAdi = form.urunAdi.trim();
    const baslangicTarihi = form.baslangicTarihi.trim();
    const bitkiSayisi = Number(form.bitkiSayisi);
    if (!urunAdi) {
      setError("Crop name is required.");
      return;
    }
    if (!baslangicTarihi) {
      setError("Start date is required.");
      return;
    }
    if (!Number.isFinite(bitkiSayisi) || bitkiSayisi < 0) {
      setError("Plant count must be a valid number.");
      return;
    }
    await onSubmit({
      id: crypto.randomUUID(),
      urunAdi,
      baslangicTarihi,
      bitkiSayisi,
      notlar: form.notlar.trim(),
    });
    setForm(emptyForm);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-line bg-surface p-4 shadow-sm">
      <div className="text-sm font-semibold text-ink">New grow batch</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-ink-muted">Crop name</span>
          <input
            name="urunAdi"
            value={form.urunAdi}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-line bg-surface-muted px-3 py-2 text-sm text-ink outline-none ring-accent focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-ink-muted">Start date</span>
          <input
            type="date"
            name="baslangicTarihi"
            value={form.baslangicTarihi}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-line bg-surface-muted px-3 py-2 text-sm text-ink outline-none ring-accent focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-ink-muted">Plant count</span>
          <input
            name="bitkiSayisi"
            value={form.bitkiSayisi}
            onChange={handleChange}
            inputMode="numeric"
            className="mt-1 w-full rounded-md border border-line bg-surface-muted px-3 py-2 text-sm text-ink outline-none ring-accent focus:ring-2"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="text-ink-muted">Notes</span>
          <textarea
            name="notlar"
            value={form.notlar}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full rounded-md border border-line bg-surface-muted px-3 py-2 text-sm text-ink outline-none ring-accent focus:ring-2"
          />
        </label>
      </div>
      {error ? <p className="text-sm text-rose-700 dark:text-rose-300">{error}</p> : null}
      <button type="submit" className="btn-pill-primary">
        Save batch
      </button>
    </form>
  );
}
