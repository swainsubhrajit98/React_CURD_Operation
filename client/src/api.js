import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const ItemAPI = {
  list: (params = {}) => api.get("/items", { params }).then((r) => r.data),
  get: (id) => api.get(`/items/${id}`).then((r) => r.data),
  create: (payload) => api.post("/items", payload).then((r) => r.data),
  update: (id, payload) =>
    api.patch(`/items/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/items/${id}`).then((r) => r.data),
};
