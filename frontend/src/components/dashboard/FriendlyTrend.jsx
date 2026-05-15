import { trendDirection } from "../../utils/sensorHistoryStats.js";

const DIR_LABEL = {
  yukari: "Rising",
  asagi: "Falling",
  sabit: "Stable",
};

export function FriendlyTrend({ prev, last, epsilon }) {
  const dir = trendDirection(prev, last, epsilon);
  return <span className="text-xs text-ink-muted">{DIR_LABEL[dir] ?? DIR_LABEL.sabit}</span>;
}
