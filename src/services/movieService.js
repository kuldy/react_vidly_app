import http from "./httpService";
import { apiUrl } from "../config.json";

async function getMovies() {
  const { data } = await http.get(apiUrl + `/movies`);
  return data.movies;
}

async function deleteMovie(movieId) {
  return await http.delete(apiUrl + `/delete-movie/${movieId}`);
}

export { getMovies, deleteMovie };
