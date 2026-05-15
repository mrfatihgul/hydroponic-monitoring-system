import { useAppState } from "../context/AppStateContext.jsx";

export function useSensorSimulation() {
  const {
    history,
    isStreaming,
    setIsStreaming,
    triggerAnomaly,
    resetHistory,
    appendTick,
    systemEvents,
  } = useAppState();
  return { history, isStreaming, setIsStreaming, triggerAnomaly, resetHistory, appendTick, systemEvents };
}
