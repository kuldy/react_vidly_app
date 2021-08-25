import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const newest = "newest";
  const approved = "true";
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to={`/posts/2019/06?sortBy=${newest}&approved=${approved}`}>
            Posts
          </Link>
        </li>
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li>
          <Link to="/messages">Masegaes Redirects to Posts</Link>
        </li>
        <li>
          <Link to="/xyz">Invalid Url</Link>
        </li>
      </ul>
    </>
  );
};

export default NavBar;
