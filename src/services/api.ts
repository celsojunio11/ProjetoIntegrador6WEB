import axios from "axios";

const api = axios.create({
  baseURL: "http://gestaobov.hopto.org:8082",
});

export default api;
