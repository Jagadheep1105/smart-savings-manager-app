 
import axios from "axios";

const API_BASE = "/api";

export const api = {
  users: {
    getAll: () => axios.get(`${API_BASE}/users`),
    login: (data) => axios.post(`${API_BASE}/users/login`, data),
    register: (data) => axios.post(`${API_BASE}/users/register`, data),
    update: (id, data) => axios.put(`${API_BASE}/users/${id}`, data),
  },
  schemes: {
    getAll: () => axios.get(`${API_BASE}/schemes`),
    create: (data) => axios.post(`${API_BASE}/schemes`, data),
    delete: (id) => axios.delete(`${API_BASE}/schemes/${id}`),
  },
  messages: {
    getAll: () => axios.get(`${API_BASE}/messages`),
    create: (data) => axios.post(`${API_BASE}/messages`, data),
    update: (id) => axios.put(`${API_BASE}/messages/${id}`),
  },
};