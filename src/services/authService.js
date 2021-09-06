import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

async function login(email, password) {
  const { data: jwt } = await http.post(apiUrl + "/login", { email, password });
  // console.log(jwt);
  localStorage.setItem(tokenKey, jwt.token);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function loginWithJwt(data) {
  // console.log("registered user is:", data);
  localStorage.setItem(tokenKey, data.token);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const { data } = jwtDecode(jwt);
    return data;
  } catch (error) {
    {
      return null;
    }
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
};
