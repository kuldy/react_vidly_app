import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

http.setJwt(getJwt());

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
    let user = data;
    user.isAdmin = user.is_admin === "0" ? false : true;
    delete user.is_admin;

    return user;
  } catch (error) {
    {
      return null;
    }
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
