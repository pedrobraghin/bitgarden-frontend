import axios from 'axios';

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: 'http://localhost:8081/api/v1',
  withCredentials: true,
});
