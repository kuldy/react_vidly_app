import http from "./httpService";
import { apiUrl } from "../config.json";

function login(email, password) {
  return http.post(apiUrl + "/login", { email, password });
}

export { login };
