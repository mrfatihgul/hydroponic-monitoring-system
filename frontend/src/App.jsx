import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DataModeProvider } from "./context/DataModeContext.jsx";
import { AppStateProvider } from "./context/AppStateContext.jsx";
import { AppShell } from "./components/layout/AppShell.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { BatchesPage } from "./pages/BatchesPage.jsx";
import { ThresholdsPage } from "./pages/ThresholdsPage.jsx";
import { AnalysisPage } from "./pages/AnalysisPage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";

export default function App() {
  return (
    <DataModeProvider>
      <AppStateProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<DashboardPage />} />
              <Route path="batches" element={<BatchesPage />} />
              <Route path="thresholds" element={<ThresholdsPage />} />
              <Route path="analysis" element={<AnalysisPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="partiler" element={<Navigate to="/batches" replace />} />
              <Route path="esikler" element={<Navigate to="/thresholds" replace />} />
              <Route path="analiz" element={<Navigate to="/analysis" replace />} />
              <Route path="hakkinda" element={<Navigate to="/about" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppStateProvider>
    </DataModeProvider>
  );
}
