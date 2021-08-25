import React from "react";

const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>Movie Form {match.params.id}</h1>
      <div className="btn btn-primary" onClick={() => history.push("/movies")}>
        Save
      </div>
    </div>
  );
};

export default MovieForm;
