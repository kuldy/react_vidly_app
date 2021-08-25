import React from "react";

import CounterApp from "./counterApp.js/CounterApp";
import RoutingApp from "./routingApp/RoutingApp";
import MoviesApp from "./vidly/MoviesApp";

function App() {
  return (
    <>
      <main className="container">
        {/* <CounterApp /> */}
        <MoviesApp />
        {/* <RoutingApp /> */}
      </main>
    </>
  );
}

export default App;
