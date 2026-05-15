export const SENSOR_BASELINE = {
  ph: 6.0,
  ec: 1.4,
  sicaklik: 23,
  nem: 60,
  suSeviyesi: 72,
};

export const SENSOR_DRIFT = {
  ph: 0.06,
  ec: 0.08,
  sicaklik: 0.35,
  nem: 1.2,
  suSeviyesi: 1.5,
};

export const SENSOR_HARD_LIMITS = {
  ph: { min: 4.0, max: 8.5 },
  ec: { min: 0.2, max: 4.0 },
  sicaklik: { min: 10, max: 38 },
  nem: { min: 15, max: 98 },
  suSeviyesi: { min: 5, max: 100 },
};
