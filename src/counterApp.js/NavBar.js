import React, { Component } from "react";

class NavBar extends Component {
  render() {
    const { totalCounters } = this.props;
    return (
      <nav className="navbar navbar-light bg-danger">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 text-white h1">
            Navbar{" "}
            <span className="badge rounded-pill bg-secondary">
              {totalCounters}
            </span>
          </span>
        </div>
      </nav>
    );
  }
}

export default NavBar;
