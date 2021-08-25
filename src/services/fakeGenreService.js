export const genres = [
  { _id: 1, name: "Action" },
  { _id: 2, name: "Sci-fi" },
  { _id: 3, name: "Fantacy" },
];
export const getGenres = () => {
  return genres.filter((g) => g);
};
