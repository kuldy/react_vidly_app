import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { editMovie, getMovie } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import SelectInput from "./common/SelectInput";
import { Link } from "react-router-dom";

class EditMovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
    test: ["a", "b", "c", "d"],
  };
  schema = {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().required().min(0).max(100),
    dailyRentalRate: Joi.number().required().min(0).max(10),
    // level: Joi.string(),
    // hooks: Joi.boolean(),
  };
  getDataFromMovie = (movie) => {
    const data = {};
    data.title = movie.title;
    data.genre = movie.genre._id.toString();
    data.numberInStock = movie.numberInStock;
    data.dailyRentalRate = movie.dailyRentalRate;
    return data;
  };

  componentDidMount() {
    const { match, history } = this.props;
    const genres = [...getGenres()];
    const movie = getMovie(match.params.id);
    const data = this.getDataFromMovie(movie);
    this.setState({ data, genres });
  }
  doSubmit() {
    const { match, history } = this.props;
    console.log("edit form submission goes here");
    editMovie(this.state.data, match.params.id);
    history.push("/movies");
  }
  render() {
    const { match } = this.props;
    const { genres } = this.state;
    return (
      <div>
        <Link to="/movies/8x">go to</Link>
        <form className="col-md-6 offset-md-3" onSubmit={this.handleSubmit}>
          <h1 className="text-center">
            Edit <span className="text-primary"> Movie</span> Form{" "}
            {match.params.id}
          </h1>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", genres)}

          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default EditMovieForm;
