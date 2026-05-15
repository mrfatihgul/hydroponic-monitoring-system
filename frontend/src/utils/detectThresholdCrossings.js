function belowMin(prev, next, min) {
  return prev >= min && next < min;
}

function aboveMax(prev, next, max) {
  return prev <= max && next > max;
}

function returnedToBand(prev, next, min, max) {
  return (prev < min || prev > max) && next >= min && next <= max;
}

export function detectThresholdCrossings(prevReading, nextReading, thresholds) {
  if (!prevReading || !nextReading || !thresholds) return [];

  const events = [];

  if (belowMin(prevReading.ph, nextReading.ph, thresholds.phMin)) {
    events.push({ tip: "kritik", mesaj: "pH dropped below the threshold." });
  } else if (aboveMax(prevReading.ph, nextReading.ph, thresholds.phMax)) {
    events.push({ tip: "kritik", mesaj: "pH rose above the threshold." });
  } else if (returnedToBand(prevReading.ph, nextReading.ph, thresholds.phMin, thresholds.phMax)) {
    events.push({ tip: "bilgi", mesaj: "pH returned to the target band." });
  }

  if (belowMin(prevReading.ec, nextReading.ec, thresholds.ecMin)) {
    events.push({ tip: "kritik", mesaj: "EC dropped below the threshold." });
  } else if (aboveMax(prevReading.ec, nextReading.ec, thresholds.ecMax)) {
    events.push({ tip: "kritik", mesaj: "EC rose above the threshold." });
  } else if (returnedToBand(prevReading.ec, nextReading.ec, thresholds.ecMin, thresholds.ecMax)) {
    events.push({ tip: "bilgi", mesaj: "EC returned to the target band." });
  }

  if (belowMin(prevReading.sicaklik, nextReading.sicaklik, thresholds.sicaklikMin)) {
    events.push({ tip: "uyari", mesaj: "Temperature dropped below the threshold." });
  } else if (aboveMax(prevReading.sicaklik, nextReading.sicaklik, thresholds.sicaklikMax)) {
    events.push({ tip: "uyari", mesaj: "Temperature rose above the threshold." });
  } else if (
    returnedToBand(prevReading.sicaklik, nextReading.sicaklik, thresholds.sicaklikMin, thresholds.sicaklikMax)
  ) {
    events.push({ tip: "bilgi", mesaj: "Temperature returned to the target band." });
  }

  if (belowMin(prevReading.nem, nextReading.nem, thresholds.nemMin)) {
    events.push({ tip: "uyari", mesaj: "Humidity dropped below the threshold." });
  } else if (aboveMax(prevReading.nem, nextReading.nem, thresholds.nemMax)) {
    events.push({ tip: "uyari", mesaj: "Humidity rose above the threshold." });
  } else if (returnedToBand(prevReading.nem, nextReading.nem, thresholds.nemMin, thresholds.nemMax)) {
    events.push({ tip: "bilgi", mesaj: "Humidity returned to the target band." });
  }

  if (belowMin(prevReading.suSeviyesi, nextReading.suSeviyesi, thresholds.suSeviyesiMin)) {
    events.push({ tip: "kritik", mesaj: "Water level dropped below the threshold." });
  } else if (aboveMax(prevReading.suSeviyesi, nextReading.suSeviyesi, thresholds.suSeviyesiMax)) {
    events.push({ tip: "uyari", mesaj: "Water level reached the upper threshold." });
  } else if (
    returnedToBand(
      prevReading.suSeviyesi,
      nextReading.suSeviyesi,
      thresholds.suSeviyesiMin,
      thresholds.suSeviyesiMax,
    )
  ) {
    events.push({ tip: "bilgi", mesaj: "Water level returned to normal." });
  }

  return events;
}
