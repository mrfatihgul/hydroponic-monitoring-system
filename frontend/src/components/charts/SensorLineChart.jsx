import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_GRID_OPACITY, CHART_LINE_WIDTH } from "../../constants/chartTokens.js";

function formatTooltipNumber(value, fractionDigits) {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(fractionDigits);
}

function ChartTooltip({ active, payload, label, unit, fractionDigits }) {
  if (!active || !payload?.length) return null;
  const row = payload[0];
  return (
    <div className="rounded border border-line bg-surface px-2 py-1.5 text-[11px] shadow-sm">
      <div className="font-mono text-ink-muted">{label}</div>
      <div className="mt-0.5 font-mono font-semibold text-ink">
        {row.name}: {formatTooltipNumber(row.value, fractionDigits)} {unit}
      </div>
    </div>
  );
}

export function SensorLineChart({
  data,
  dataKey,
  name,
  stroke,
  heightPx,
  unit = "",
  fractionDigits = 2,
}) {
  if (!data.length) {
    return (
      <div
        className="flex w-full items-center justify-center rounded border border-dashed border-line text-[11px] text-ink-muted"
        style={{ height: heightPx }}
      >
        No data
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height: heightPx }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="2 4"
            vertical={false}
            stroke="rgb(var(--line))"
            strokeOpacity={CHART_GRID_OPACITY}
          />
          <XAxis
            dataKey="zamanEtiketi"
            tick={{ fontSize: 10 }}
            stroke="rgb(var(--ink-muted))"
            tickMargin={6}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 10 }} stroke="rgb(var(--ink-muted))" width={36} tickMargin={4} />
          <Tooltip
            cursor={{ stroke: "rgb(var(--line))", strokeWidth: 1 }}
            content={({ active, payload, label }) => (
              <ChartTooltip
                active={active}
                payload={payload}
                label={label}
                unit={unit}
                fractionDigits={fractionDigits}
              />
            )}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            name={name}
            stroke={stroke}
            dot={false}
            strokeWidth={CHART_LINE_WIDTH}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
