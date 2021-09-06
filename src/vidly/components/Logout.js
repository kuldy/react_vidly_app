import React, { useEffect } from "react";
import auth from "../../services/authService";

const Logout = () => {
  useEffect(() => {
    auth.logout();
    window.location = "/";
  }, []);
  return null;
};

export default Logout;

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
