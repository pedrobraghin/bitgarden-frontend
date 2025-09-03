import axios from 'axios';
import {v4 as uuid} from "uuid";

export const api = axios.create({
  baseURL: 'http://localhost:8081/api/v1',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (!config.headers["x-correlation-id"]) {
    config.headers["x-correlation-id"] = uuid();
  }
  return config;
})
