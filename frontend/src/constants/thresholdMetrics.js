/** Server threshold row keys (PH, EC, ...). */
export const METRIC_NAMES = {
  PH: "PH",
  EC: "EC",
  TEMPERATURE: "TEMPERATURE",
  HUMIDITY: "HUMIDITY",
  WATER_LEVEL: "WATER_LEVEL",
};

/** Maps UI flat threshold fields to server metric names. */
export const THRESHOLD_METRIC_BINDINGS = [
  { metricName: METRIC_NAMES.PH, minKey: "phMin", maxKey: "phMax" },
  { metricName: METRIC_NAMES.EC, minKey: "ecMin", maxKey: "ecMax" },
  { metricName: METRIC_NAMES.TEMPERATURE, minKey: "sicaklikMin", maxKey: "sicaklikMax" },
  { metricName: METRIC_NAMES.HUMIDITY, minKey: "nemMin", maxKey: "nemMax" },
  { metricName: METRIC_NAMES.WATER_LEVEL, minKey: "suSeviyesiMin", maxKey: "suSeviyesiMax" },
];
