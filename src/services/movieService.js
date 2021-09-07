import http from "./httpService";
import { apiUrl } from "../config.json";

const endPoint = "/movies";

async function getMovies() {
  const { data } = await http.get(apiUrl + endPoint);
  return data.movies;
}

async function deleteMovie(movieId) {
  return await http.delete(apiUrl + `${endPoint}/${movieId}`);
}

async function getMovie(movie_id) {
  const { data } = await http.get(apiUrl + `${endPoint}/${movie_id}`);
  return data;
}

async function saveMovie(movie) {
  // console.log("submitted movie object is:", movie);
  if (movie.id) {
    return http.put(apiUrl + `${endPoint}/${movie.id}`, movie);
  }
  return http.post(apiUrl + endPoint, movie);
}

export { getMovies, getMovie, saveMovie, deleteMovie };
