import axios from "axios";

const api = axios.create({
  baseURL: "http://gestaobov.hopto.org:3333",
});

export default api;
