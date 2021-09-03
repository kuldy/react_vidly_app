import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";

import { paginate } from "../../utils/paginate";
import { deleteMovie, getMovies } from "../../services/movieService";
import { getGenres } from "../../services/genreService";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import { Link, NavLink } from "react-router-dom";
import SearchBox from "./common/SearchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedItem: null,
    sortColumn: { path: "title", order: "asc" },
    pageSize: 10,
    currentPage: 1,
    searchText: "",
  };

  modelGenres = (data) => {
    const genres = data.map((g) => {
      return { _id: g.id, name: g.name };
    });
    return genres;
  };

  modelMoviesView = (movies) => {
    const modeledMovies = movies.map((movie) => {
      if (movie.is_liked == 0) {
        movie.is_liked = false;
      }
      return {
        _id: movie.id,
        title: movie.title,
        genre: { _id: movie.genre_id, name: movie.name },
        numberInStock: movie.number_in_stock,
        dailyRentalRate: movie.daily_rental_rate,
        isLiked: movie.is_liked,
      };
    });
    return modeledMovies;
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const modeledGenres = this.modelGenres(data);
    // console.log("after model genres is:", modeledGenres);
    const genres = [{ _id: "", name: "All Genres" }, ...modeledGenres];

    const films = await getMovies();
    const movies = this.modelMoviesView(films);
    console.log("movies are", movies);

    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    console.log("movie is:", movie);
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      // console.log("error is:", error.response);
      if (error.response.status == 404) {
        const message = error.response.data.messages.error;
        // console.log("message is: ", message);
        toast.error(message);
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedItem: genre, currentPage: 1, searchText: "" });
  };

  handleLike = (movie) => {
    // const movies = this.state.movies.map((m) => {
    //   if (m._id === movie._id) {
    //     m.isLiked = !m.isLiked;
    //   }
    //   return m;
    // });

    // this.setState(movies);

    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].isLiked = !movies[index].isLiked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  applySearch = (query, movies) => {
    return query
      ? movies.filter((m) =>
          m.title.toLowerCase().includes(query.toLowerCase())
        )
      : movies;
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedItem,
      sortColumn,
      searchText,
    } = this.state;

    const filteredMovies =
      selectedItem && selectedItem._id
        ? allMovies.filter((m) => m.genre._id == selectedItem._id)
        : this.applySearch(searchText, allMovies);

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  handleSearch = (query) => {
    const searchText = query;
    this.setState({ searchText, selectedItem: null, currentPage: 1 });
  };

  handleAlert = () => {
    toast.error("Created toastify error");
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchText } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    if (count === 0) return <p>There are no Movies in the database</p>;

    return (
      <div className="row">
        <div className="col-md-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedItem}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col-md">
          <Link className="btn btn-primary mb-3" to="/movies/new">
            New Movie
          </Link>

          <button onClick={this.P} className="btn btn-danger mx-3 mb-3">
            Start Alert
          </button>

          <p>There are total {totalCount} movies in the database</p>
          <SearchBox value={searchText} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCounts={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
