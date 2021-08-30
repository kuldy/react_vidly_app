import { getGenre } from "./fakeGenreService";
const movies = [
  {
    _id: "1",
    title: "Terminator",
    genre: { _id: 1, name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28:809Z",
    isLiked: false,
  },
  {
    _id: "2",
    title: "Marsh Man",
    genre: { _id: 2, name: "Sci-fi" },
    numberInStock: 9,
    dailyRentalRate: 3.5,
    publishDate: "2018-02-03T19:04:28:809Z",
    isLiked: false,
  },
  {
    _id: "3",
    title: "Oblivion",
    genre: { _id: 2, name: "Sci-fi" },
    numberInStock: 7,
    dailyRentalRate: 2.9,
    publishDate: "2018-03-03T19:04:28:809Z",
    isLiked: false,
  },
  {
    _id: "4",
    title: "Lords Of The Rings",
    genre: { _id: 3, name: "Fantacy" },
    numberInStock: 2,
    dailyRentalRate: 4.5,
    publishDate: "2018-04-03T19:04:28:809Z",
    isLiked: false,
  },
  {
    _id: "5",
    title: "Matrix",
    genre: { _id: 2, name: "Sci-fi" },
    numberInStock: 10,
    dailyRentalRate: 4.1,
    publishDate: "2018-05-03T19:04:28:809Z",
    isLiked: false,
  },
  {
    _id: "6",
    title: "Gladiator",
    genre: { _id: 1, name: "Action" },
    numberInStock: 8,
    dailyRentalRate: 3.5,
    publishDate: "2018-06-03T19:04:28:809Z",
    isLiked: false,
  },
  {
    _id: "7",
    title: "King Author",
    genre: { _id: 3, name: "Fantacy" },
    numberInStock: 5,
    dailyRentalRate: 4.9,
    publishDate: "2018-07-03T19:04:28:809Z",
    isLiked: false,
  },
  {
    _id: "8",
    title: "Die Hard",
    genre: { _id: 1, name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 3.0,
    publishDate: "2018-08-03T19:04:28:809Z",
    isLiked: false,
  },
  {
    _id: "9",
    title: "Snow White",
    genre: { _id: 3, name: "Fantacy" },
    numberInStock: 8,
    dailyRentalRate: 4.1,
    publishDate: "2018-09-03T19:04:28:809Z",
    isLiked: false,
  },
];

export function getMovies() {
  return movies;
}
export function getMovie(id) {
  return movies.find((movie) => movie._id === id);
}

export function addMovie(film) {
  let id = 0;
  movies.forEach((m) => {
    if (parseInt(m._id) > id) {
      id = parseInt(m._id);
    }
  });
  const _id = (id + 1).toString();

  const movie = { _id, ...film };
  movie.genre = getGenre(parseInt(movie.genre));
  movie.isLiked = false;
  movie.publishDate = "2018-09-03T19:04:28:809Z";
  movies.push(movie);
  console.log("movies list", getMovies());
}
export function editMovie(film, id) {
  const _id = id.toString();
  const movieObj = { _id, ...film };
  movieObj.genre = getGenre(film.genre);
  movieObj.isLiked = false;
  movieObj.publishDate = "2018-09-03T19:04:28:809Z";

  const index = movies.indexOf(getMovie(_id));
  movies[index] = movieObj;
  console.log(movies);
}

export function saveMovie(film) {
  const movie = movies.find((m) => m._id === film._id) || {};
  movie.title = film.title;
  movie.genre = getGenre(film.genreId);
  movie.numberInStock = film.numberInStock;
  movie.dailyRentalRate = film.dailyRentalRate;

  if (!movie._id) {
    movie._id = Date.now().toString();
    movie.isLiked = false;
    movie.publishDate = "2018-09-03T19:04:28:809Z";
    movies.push(movie);
  }
  console.log("saveMovie", movie);
  return movie;
}

export function deleteMovie(film) {
  // const index = movies.indexOf(movie)
  console.log(film);
  const index = movies.indexOf(film);
  movies.splice(index, 1);
  // movies = movies.filter((m) => m._id !== film._id); const error
  return movies;
}
