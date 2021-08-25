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
