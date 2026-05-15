import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDataMode } from "./DataModeContext.jsx";
import { DEFAULT_THRESHOLDS } from "../constants/defaultThresholds.js";
import { MAX_SYSTEM_LOG_ENTRIES } from "../constants/dashboardUi.js";
import { SYSTEM_LOG_TIP } from "../constants/systemLog.js";
import { SENSOR_TICK_MS, MAX_SENSOR_HISTORY } from "../constants/timing.js";
import { THRESHOLD_METRIC_BINDINGS } from "../constants/thresholdMetrics.js";
import { generateSensorReading } from "../utils/generateSensorReading.js";
import { detectThresholdCrossings } from "../utils/detectThresholdCrossings.js";
import {
  loadBatches,
  loadSensorHistory,
  loadThresholds,
  loadTheme,
  saveBatches,
  saveSensorHistory,
  saveThresholds,
  saveTheme,
} from "../utils/storage/localStorage.js";
import { createInitialBatches, createInitialThresholds } from "../data/defaults.js";
import { sensorReadingsApi } from "../services/api/sensorReadingsApi.js";
import { plantBatchesApi } from "../services/api/plantBatchesApi.js";
import { thresholdSettingsApi } from "../services/api/thresholdSettingsApi.js";
import { systemEventsApi } from "../services/api/systemEventsApi.js";
import { getApiErrorMessage } from "../services/api/apiErrors.js";
import {
  mapPlantBatchFromApi,
  mapPlantBatchToApiCreate,
  mapSensorReadingFromApi,
  mapSensorReadingToApiPayload,
  mapSystemEventFromApi,
  mapSystemEventToApiCreate,
  thresholdIdsByMetricName,
  thresholdRowsToFlat,
} from "../services/api/mappers.js";

const AppStateContext = createContext(null);

function trimHistory(list) {
  if (list.length <= MAX_SENSOR_HISTORY) return list;
  return list.slice(list.length - MAX_SENSOR_HISTORY);
}

function createReading(previousValues, forceAnomaly) {
  const values = generateSensorReading(previousValues, { forceAnomaly });
  return {
    id: crypto.randomUUID(),
    zaman: new Date().toISOString(),
    ph: values.ph,
    ec: values.ec,
    sicaklik: values.sicaklik,
    nem: values.nem,
    suSeviyesi: values.suSeviyesi,
  };
}

export function AppStateProvider({ children }) {
  const { dataMode, forceDemoMode } = useDataMode();
  const isApi = dataMode === "api";

  const [theme, setThemeState] = useState(() => loadTheme());
  const [thresholds, setThresholdsState] = useState(() => {
    const stored = loadThresholds(null);
    return stored && typeof stored === "object" ? { ...stored } : createInitialThresholds();
  });
  const [batches, setBatchesState] = useState(() => {
    const stored = loadBatches();
    if (stored === null) return createInitialBatches();
    return stored;
  });
  const [history, setHistoryState] = useState(() => {
    const stored = loadSensorHistory([]);
    return Array.isArray(stored) ? stored : [];
  });
  const [isStreaming, setIsStreaming] = useState(true);
  const [systemEvents, setSystemEvents] = useState([]);
  const [apiSyncReady, setApiSyncReady] = useState(() => dataMode !== "api");
  const anomalyNextRef = useRef(false);
  const lastCrossingKeyRef = useRef("");
  const firstStreamEffectRef = useRef(true);
  const thresholdIdsRef = useRef({});

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (isApi) return;
    saveThresholds(thresholds);
  }, [thresholds, isApi]);

  useEffect(() => {
    if (isApi) return;
    saveBatches(batches);
  }, [batches, isApi]);

  useEffect(() => {
    if (isApi) return;
    saveSensorHistory(history);
  }, [history, isApi]);

  const prevModeRef = useRef(dataMode);
  useEffect(() => {
    const prev = prevModeRef.current;
    prevModeRef.current = dataMode;
    if (prev === "api" && dataMode === "demo") {
      const storedTh = loadThresholds(null);
      setThresholdsState(
        storedTh && typeof storedTh === "object" ? { ...storedTh } : createInitialThresholds(),
      );
      const storedB = loadBatches();
      setBatchesState(storedB === null ? createInitialBatches() : storedB);
      const storedH = loadSensorHistory([]);
      setHistoryState(Array.isArray(storedH) ? storedH : []);
      setSystemEvents([]);
    }
  }, [dataMode]);

  useEffect(() => {
    if (!isApi) {
      setApiSyncReady(true);
      return undefined;
    }
    setApiSyncReady(false);
    let cancelled = false;
    (async () => {
      try {
        const [readings, batchList, thRows, evList] = await Promise.all([
          sensorReadingsApi.list(),
          plantBatchesApi.list(),
          thresholdSettingsApi.list(),
          systemEventsApi.list(),
        ]);
        if (cancelled) return;
        thresholdIdsRef.current = thresholdIdsByMetricName(thRows);
        setThresholdsState(thresholdRowsToFlat(thRows));
        setBatchesState(batchList.map(mapPlantBatchFromApi));
        setHistoryState(readings.map(mapSensorReadingFromApi));
        setSystemEvents(evList.map(mapSystemEventFromApi).slice(0, MAX_SYSTEM_LOG_ENTRIES));
        setApiSyncReady(true);
      } catch (err) {
        if (cancelled) return;
        forceDemoMode(getApiErrorMessage(err));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isApi, forceDemoMode]);

  const pushSystemEvent = useCallback(
    (partial) => {
      const tip = partial.tip ?? SYSTEM_LOG_TIP.bilgi;
      const mesaj = partial.mesaj ?? "";
      if (isApi) {
        const synthetic = { tip, mesaj };
        systemEventsApi
          .create(mapSystemEventToApiCreate(synthetic))
          .then((dto) => {
            setSystemEvents((prev) => [mapSystemEventFromApi(dto), ...prev].slice(0, MAX_SYSTEM_LOG_ENTRIES));
          })
          .catch(() => {});
        return;
      }
      const evt = {
        id: crypto.randomUUID(),
        zaman: new Date().toISOString(),
        tip,
        mesaj,
      };
      setSystemEvents((prev) => [evt, ...prev].slice(0, MAX_SYSTEM_LOG_ENTRIES));
    },
    [isApi],
  );

  useEffect(() => {
    if (!history.length) {
      lastCrossingKeyRef.current = "";
      return;
    }
    if (history.length < 2) return;
    const prev = history[history.length - 2];
    const next = history[history.length - 1];
    const key = `${prev.id}->${next.id}`;
    if (lastCrossingKeyRef.current === key) return;
    lastCrossingKeyRef.current = key;
    const crossings = detectThresholdCrossings(prev, next, thresholds);
    crossings.forEach((e) => pushSystemEvent(e));
  }, [history, thresholds, pushSystemEvent]);

  useEffect(() => {
    if (firstStreamEffectRef.current) {
      firstStreamEffectRef.current = false;
      return;
    }
    pushSystemEvent({
      tip: SYSTEM_LOG_TIP.sistem,
      mesaj: isStreaming ? "Data streaming resumed." : "Data streaming paused.",
    });
  }, [isStreaming, pushSystemEvent]);

  const appendTick = useCallback(() => {
    setHistoryState((prev) => {
      const last = prev.length ? prev[prev.length - 1] : null;
      const previousValues = last
        ? {
            ph: last.ph,
            ec: last.ec,
            sicaklik: last.sicaklik,
            nem: last.nem,
            suSeviyesi: last.suSeviyesi,
          }
        : null;
      const force = anomalyNextRef.current;
      anomalyNextRef.current = false;
      const reading = createReading(previousValues, force);
      if (isApi) {
        sensorReadingsApi
          .create(mapSensorReadingToApiPayload(reading))
          .then((dto) => {
            const mapped = mapSensorReadingFromApi(dto);
            setHistoryState((p) => trimHistory([...p, mapped]));
          })
          .catch((err) => {
            forceDemoMode(getApiErrorMessage(err));
          });
        return prev;
      }
      return trimHistory([...prev, reading]);
    });
  }, [isApi, forceDemoMode]);

  useEffect(() => {
    if (!isStreaming || !apiSyncReady) return undefined;
    appendTick();
    const id = window.setInterval(() => {
      appendTick();
    }, SENSOR_TICK_MS);
    return () => window.clearInterval(id);
  }, [isStreaming, appendTick, apiSyncReady]);

  const resetThresholds = useCallback(async () => {
    if (isApi) {
      try {
        await thresholdSettingsApi.resetDefaults();
        const thRows = await thresholdSettingsApi.list();
        thresholdIdsRef.current = thresholdIdsByMetricName(thRows);
        setThresholdsState(thresholdRowsToFlat(thRows));
      } catch (err) {
        forceDemoMode(getApiErrorMessage(err));
      }
    } else {
      setThresholdsState({ ...DEFAULT_THRESHOLDS });
    }
  }, [isApi, forceDemoMode]);

  const updateThresholds = useCallback(
    (partial) => {
      setThresholdsState((prev) => {
        const next = { ...prev, ...partial };
        if (isApi) {
          (async () => {
            try {
              for (const b of THRESHOLD_METRIC_BINDINGS) {
                const rowId = thresholdIdsRef.current[b.metricName];
                if (rowId == null) continue;
                await thresholdSettingsApi.update(rowId, {
                  minValue: next[b.minKey],
                  maxValue: next[b.maxKey],
                });
              }
            } catch (err) {
              forceDemoMode(getApiErrorMessage(err));
            }
          })();
        }
        return next;
      });
    },
    [isApi, forceDemoMode],
  );

  const addBatch = useCallback(
    async (batch) => {
      if (isApi) {
        try {
          const dto = await plantBatchesApi.create(mapPlantBatchToApiCreate(batch));
          setBatchesState((prev) => [...prev, mapPlantBatchFromApi(dto)]);
        } catch (err) {
          forceDemoMode(getApiErrorMessage(err));
        }
      } else {
        setBatchesState((prev) => [...prev, batch]);
      }
    },
    [isApi, forceDemoMode],
  );

  const removeBatch = useCallback(
    async (id) => {
      if (isApi) {
        try {
          await plantBatchesApi.remove(Number(id));
          setBatchesState((prev) => prev.filter((b) => String(b.id) !== String(id)));
        } catch (err) {
          forceDemoMode(getApiErrorMessage(err));
        }
      } else {
        setBatchesState((prev) => prev.filter((b) => b.id !== id));
      }
    },
    [isApi, forceDemoMode],
  );

  const resetHistory = useCallback(async () => {
    if (isApi) {
      try {
        await sensorReadingsApi.deleteAll();
        setHistoryState([]);
        pushSystemEvent({ tip: SYSTEM_LOG_TIP.sistem, mesaj: "Sensor history cleared." });
      } catch (err) {
        forceDemoMode(getApiErrorMessage(err));
      }
    } else {
      setHistoryState([]);
      pushSystemEvent({ tip: SYSTEM_LOG_TIP.sistem, mesaj: "Sensor history cleared." });
    }
  }, [isApi, forceDemoMode, pushSystemEvent]);

  const triggerAnomaly = useCallback(() => {
    anomalyNextRef.current = true;
    pushSystemEvent({
      tip: SYSTEM_LOG_TIP.sistem,
      mesaj: "Anomaly simulation queued for the next sample.",
    });
  }, [pushSystemEvent]);

  const setTheme = useCallback((next) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      dataMode,
      theme,
      setTheme,
      toggleTheme,
      thresholds,
      setThresholds: updateThresholds,
      resetThresholds,
      batches,
      addBatch,
      removeBatch,
      history,
      isStreaming,
      setIsStreaming,
      resetHistory,
      triggerAnomaly,
      appendTick,
      systemEvents,
    }),
    [
      dataMode,
      theme,
      setTheme,
      toggleTheme,
      thresholds,
      updateThresholds,
      resetThresholds,
      batches,
      addBatch,
      removeBatch,
      history,
      isStreaming,
      resetHistory,
      triggerAnomaly,
      appendTick,
      systemEvents,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider.");
  }
  return ctx;
}
