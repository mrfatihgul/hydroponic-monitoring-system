import { useAppState } from "../context/AppStateContext.jsx";
import { BatchForm } from "../components/forms/BatchForm.jsx";
import { formatDateDisplay } from "../utils/formatters.js";

export function BatchesPage() {
  const { batches, addBatch, removeBatch, dataMode } = useAppState();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-ink">Grow batches</h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-muted">
          {dataMode === "api"
            ? "Batches are stored on the server. Deletion cannot be undone."
            : "Batches are stored in your browser. Deletion cannot be undone."}
        </p>
      </div>

      <BatchForm onSubmit={addBatch} />

      <div className="rounded-lg border border-line bg-surface shadow-sm">
        <div className="border-b border-line px-4 py-3 text-sm font-semibold text-ink">Saved batches</div>
        {batches.length === 0 ? (
          <div className="px-4 py-6 text-sm text-ink-muted">No batches yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-surface-muted/60 text-xs uppercase text-ink-muted">
                <tr>
                  <th className="px-4 py-2 font-medium">Crop</th>
                  <th className="px-4 py-2 font-medium">Start</th>
                  <th className="px-4 py-2 font-medium">Plants</th>
                  <th className="px-4 py-2 font-medium">Notes</th>
                  <th className="px-4 py-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((b) => (
                  <tr key={b.id} className="border-t border-line">
                    <td className="px-4 py-3 font-medium text-ink">{b.urunAdi}</td>
                    <td className="px-4 py-3 text-ink-muted">{formatDateDisplay(b.baslangicTarihi)}</td>
                    <td className="px-4 py-3 text-ink">{b.bitkiSayisi}</td>
                    <td className="px-4 py-3 text-ink-muted">{b.notlar || "—"}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm("Delete this batch?")) void removeBatch(b.id);
                        }}
                        className="btn-pill-danger-text"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
