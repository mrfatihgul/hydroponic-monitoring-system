import { apiClient } from "./client.js";

export const sensorReadingsApi = {
  list() {
    return apiClient.get("/sensor-readings").then((r) => r.data);
  },
  latest() {
    return apiClient.get("/sensor-readings/latest").then((r) => r.data);
  },
  create(body) {
    return apiClient.post("/sensor-readings", body).then((r) => r.data);
  },
  deleteAll() {
    return apiClient.delete("/sensor-readings");
  },
};
