import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../../services/authService";
import Like from "./common/Like";
import Table from "./common/Table";

class MoviesTable extends Component {
  columns = [
    {
      label: "Title",
      path: "title",
      content: (movie) => <Link to={`movies/${movie._id}`}>{movie.title}</Link>,
    },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rating", path: "dailyRentalRate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          isLiked={movie.isLiked}
          onClick={() => this.props.onLike(movie)}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-small"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin == true) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
