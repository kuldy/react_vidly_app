import http from "./httpService";
import { apiUrl } from "../config.json";

function register(user) {
  return http.post(apiUrl + `/register`, {
    email: user.username,
    name: user.name,
    password: user.password,
    phone_no: 9812358723,
  });
}

export { register };
