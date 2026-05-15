import axios from "axios";

const rawBase = import.meta.env.VITE_API_BASE_URL ?? "";

export const apiClient = axios.create({
  baseURL: rawBase.replace(/\/$/, ""),
  timeout: 12000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});
