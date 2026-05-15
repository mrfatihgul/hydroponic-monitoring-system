import { apiClient } from "./client.js";

export const analyticsApi = {
  summary() {
    return apiClient.get("/analytics/summary").then((r) => r.data);
  },
};
