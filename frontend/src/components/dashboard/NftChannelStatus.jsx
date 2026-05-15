import { buildNftChannelSnapshot } from "../../utils/nftChannelModel.js";

function AkisBadge({ akis, aktif }) {
  if (!aktif) {
    return <span className="rounded px-1.5 py-0.5 text-xs font-medium text-ink-muted">Off</span>;
  }
  if (akis === "Flowing") {
    return (
      <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-medium text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100">
        Flowing
      </span>
    );
  }
  if (akis === "Low") {
    return (
      <span className="rounded bg-amber-50 px-1.5 py-0.5 text-xs font-medium text-amber-950 dark:bg-amber-950/40 dark:text-amber-100">
        Low
      </span>
    );
  }
  return <span className="rounded px-1.5 py-0.5 text-xs font-medium text-ink">{akis}</span>;
}

export function NftChannelStatus({ latest, thresholds }) {
  const channels = buildNftChannelSnapshot(latest, thresholds);

  return (
    <div className="rounded-lg border border-black/[0.06] bg-surface p-4 shadow-[0_1px_2px_0_rgb(0_0_0_/_0.04)] dark:border-white/[0.08]">
      <div className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">NFT channels</div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[11px] font-medium uppercase tracking-wide text-ink-muted">
              <th className="py-2 pr-2">Channel</th>
              <th className="py-2 pr-2">State</th>
              <th className="py-2 pr-2">pH</th>
              <th className="py-2 pr-2">EC</th>
              <th className="py-2">Flow</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((c) => (
              <tr key={c.id} className="border-b border-line last:border-0">
                <td className="py-2.5 pr-2 font-medium tabular-nums text-ink">{c.id}</td>
                <td className="py-2.5 pr-2">
                  {c.aktif ? (
                    <span className="rounded bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-900 dark:bg-blue-950/50 dark:text-blue-100">
                      Active
                    </span>
                  ) : (
                    <span className="rounded px-1.5 py-0.5 text-xs font-medium text-ink-muted">Inactive</span>
                  )}
                </td>
                <td className="py-2.5 pr-2 tabular-nums text-ink">{c.ph == null ? "—" : c.ph.toFixed(2)}</td>
                <td className="py-2.5 pr-2 tabular-nums text-ink">{c.ec == null ? "—" : c.ec.toFixed(2)}</td>
                <td className="py-2.5">
                  <AkisBadge akis={c.akis} aktif={c.aktif} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
