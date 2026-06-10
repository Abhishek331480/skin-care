import axios from "axios";

const api = axios.create({
  baseURL: "https://skin-care-backend-1qez.onrender.com/api",
  withCredentials: true,
});

export default api;