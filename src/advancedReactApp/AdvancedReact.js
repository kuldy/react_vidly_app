import React from "react";
import Movie from "./hoc/Movie";
import Rendering from "./hooks/Rendering";

const AdvancedReact = () => {
  return (
    <div>
      <h1>React Advanced</h1>
      <Movie id={2} />
      <Rendering />
    </div>
  );
};

export default AdvancedReact;
