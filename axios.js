import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000", // Adjust based on your backend
  timeout: 5000, // Optional: Set request timeout
});

export default api;