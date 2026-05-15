import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiClient } from "../services/api/client.js";
import { getApiErrorMessage } from "../services/api/apiErrors.js";
import { STORAGE_KEYS } from "../constants/storageKeys.js";

const DataModeContext = createContext(null);

function loadStoredMode() {
  if (typeof window === "undefined") return "demo";
  return window.localStorage.getItem(STORAGE_KEYS.DATA_MODE) === "api" ? "api" : "demo";
}

function persistMode(mode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEYS.DATA_MODE, mode);
}

async function pingBackend() {
  await apiClient.get("/plant-batches", { timeout: 3500 });
}

export function DataModeProvider({ children }) {
  const [dataMode, setDataModeState] = useState(() => loadStoredMode());
  const [apiError, setApiError] = useState("");

  const clearApiError = useCallback(() => setApiError(""), []);

  const forceDemoMode = useCallback((message) => {
    persistMode("demo");
    setDataModeState("demo");
    if (message) setApiError(message);
  }, []);

  const setDataMode = useCallback(async (next) => {
    if (next === "demo") {
      persistMode("demo");
      setDataModeState("demo");
      setApiError("");
      return;
    }
    setApiError("");
    try {
      await pingBackend();
      persistMode("api");
      setDataModeState("api");
    } catch (err) {
      persistMode("demo");
      setDataModeState("demo");
      setApiError(getApiErrorMessage(err));
    }
  }, []);

  useEffect(() => {
    if (loadStoredMode() !== "api") return undefined;
    let cancelled = false;
    (async () => {
      try {
        await pingBackend();
      } catch (err) {
        if (cancelled) return;
        persistMode("demo");
        setDataModeState("demo");
        setApiError(getApiErrorMessage(err));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      dataMode,
      setDataMode,
      apiError,
      clearApiError,
      forceDemoMode,
    }),
    [dataMode, setDataMode, apiError, clearApiError, forceDemoMode],
  );

  return <DataModeContext.Provider value={value}>{children}</DataModeContext.Provider>;
}

export function useDataMode() {
  const ctx = useContext(DataModeContext);
  if (!ctx) {
    throw new Error("useDataMode must be used within DataModeProvider.");
  }
  return ctx;
}
