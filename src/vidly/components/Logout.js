// import React, { Component } from "react";
// class Logout extends React.Component {
//   componentDidMount() {
//     localStorage.removeItem("token");
//     window.location = "/";
//   }
//   render() {
//     return null;
//   }
// }
// export default Logout;

import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location = "/";
  }, []);
  return null;
};

export default Logout;
