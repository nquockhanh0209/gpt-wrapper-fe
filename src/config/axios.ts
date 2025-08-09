// src/config/axios.ts
import axios from "axios";
import { API } from "./config.ts";

export const http = axios.create({
  baseURL: API.baseURL,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
