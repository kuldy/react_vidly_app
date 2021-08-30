import React, { Component } from "react";
import _ from "lodash";

import { paginate } from "../../utils/paginate";
import { deleteMovie, getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
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

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    // const movies = this.state.movies.filter((m) => m._id !== movie._id);
    const movies = deleteMovie(movie);
    this.setState({ movies });
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
