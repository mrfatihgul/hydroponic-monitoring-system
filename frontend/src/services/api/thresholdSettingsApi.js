import { apiClient } from "./client.js";

export const thresholdSettingsApi = {
  list() {
    return apiClient.get("/threshold-settings").then((r) => r.data);
  },
  update(id, body) {
    return apiClient.put(`/threshold-settings/${id}`, body).then((r) => r.data);
  },
  resetDefaults() {
    return apiClient.post("/threshold-settings/reset-defaults");
  },
};
