import React from "react";
import withToolTip from "./withToolTip";

const Movie = (props) => {
  return (
    <div>
      <h3>Movie</h3>
      {props.showToolTip && <div>Tooltips</div>}
    </div>
  );
};

export default withToolTip(Movie);
