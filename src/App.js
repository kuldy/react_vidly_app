import React from "react";

import CounterApp from "./counterApp/CounterApp";
import HttpApp from "./httpApp/HttpApp";
import RoutingApp from "./routingApp/RoutingApp";
import MoviesApp from "./vidly/MoviesApp";

function App() {
  return (
    <>
      <main className="container">
        {/* <CounterApp /> */}
        <MoviesApp />
        {/* <RoutingApp /> */}
        {/* <HttpApp /> */}
      </main>
    </>
  );
}

export default App;
