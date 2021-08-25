import React from "react";

const ProductDetails = (props) => {
  return (
    <div>
      <h1>ProductDetails- {props.match.params.id}</h1>
    </div>
  );
};

export default ProductDetails;
