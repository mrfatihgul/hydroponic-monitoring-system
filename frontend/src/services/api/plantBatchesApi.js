import { apiClient } from "./client.js";

export const plantBatchesApi = {
  list() {
    return apiClient.get("/plant-batches").then((r) => r.data);
  },
  create(body) {
    return apiClient.post("/plant-batches", body).then((r) => r.data);
  },
  update(id, body) {
    return apiClient.put(`/plant-batches/${id}`, body).then((r) => r.data);
  },
  remove(id) {
    return apiClient.delete(`/plant-batches/${id}`);
  },
};
