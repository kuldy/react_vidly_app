import http from "./httpService";
import { apiUrl } from "../config.json";

async function getMovies() {
  const { data } = await http.get(apiUrl + `/movies`);
  return data.movies;
}

async function deleteMovie(movieId) {
  return await http.delete(apiUrl + `/delete-movie/${movieId}`);
}

async function getMovie(movie_id) {
  const { data } = await http.get(apiUrl + `/view-movie/${movie_id}`);
  return data;
}

function saveMovie(movie) {
  // console.log("submitted movie object is:", movie);
  if (movie.id) {
    return http.put(apiUrl + `/update-movie/${movie.id}`, movie);
  }
  return http.post(apiUrl + `/add-movie`, movie);
}

export { getMovies, getMovie, saveMovie, deleteMovie };
