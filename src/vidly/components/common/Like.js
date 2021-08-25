import React, { Component } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const Like = (props) => {
  const { isLiked, onClick } = props;
  return (
    <i style={{ cursor: "pointer" }} onClick={onClick}>
      {isLiked ? <FaHeart /> : <FiHeart />}
    </i>
  );
};

export default Like;
