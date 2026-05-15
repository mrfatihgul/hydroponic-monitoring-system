import { apiClient } from "./client.js";

export const systemEventsApi = {
  list() {
    return apiClient.get("/system-events").then((r) => r.data);
  },
  create(body) {
    return apiClient.post("/system-events", body).then((r) => r.data);
  },
  deleteAll() {
    return apiClient.delete("/system-events");
  },
};
