import http from "./httpService";
import { apiUrl } from "../config.json";

async function getGenres() {
  return await http.get(apiUrl + "/genres");
}
export { getGenres };
